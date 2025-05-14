from django.db.models.signals import post_save
from django.dispatch import receiver
from shared_models.models import Match,TournamentStatusChoices, StatusChoices
from .models import Winrate

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=Match)
def handle_final_match_completion(sender, instance, **kwargs):
    """
    Signal déclenché lorsqu'un match est sauvegardé.
    Si le match est une finale (match_number=1), terminé, et a un gagnant,
    met à jour le tournoi à TERMINE et notifie les joueurs.
    """
    try:
        # Vérifier si le match est une finale terminée avec un gagnant
        if instance.match_number == 1 and instance.status == StatusChoices.TERMINE and instance.winner:
            tournament = instance.tournament
            print(tournament)
            # Vérifier que le tournoi est en cours
            if tournament.status == TournamentStatusChoices.EN_COURS:
                # Mettre à jour le tournoi
                tournament.status = TournamentStatusChoices.TERMINE
                tournament.winner = instance.winner
                tournament.save()

                # Notifier les joueurs via WebSocket
                channel_layer = get_channel_layer()
                players = [
                    tournament.player_1,
                    tournament.player_2,
                    tournament.player_3,
                    tournament.player_4
                ]
                players = [p for p in players if p is not None]  # Filtrer les joueurs non nuls

                for player in players:
                    group_name = f"user_{player.id}"
                    async_to_sync(channel_layer.group_send)(
                        group_name,
                        {
                            "type": "tournament_ended",
                            "tournament_id": tournament.id,
                            "name": tournament.name,
                            "winner": tournament.winner.name,
                        }
                    )
    except Exception as e:
        print(f"Erreur dans handle_final_match_completion pour match {instance.id}: {str(e)}")


@receiver(post_save, sender=Match)
def update_winrate_player(sender, instance, **kwargs):
    """
    Signal déclenché lorsqu'un match est sauvegardé.
    Met à jour le winrate des joueurs à chaque match.
    """
    try:
        # Récupérer les joueurs directement du match
        player_1 = instance.player_1
        player_2 = instance.player_2
        
        if (not instance.player_1 or not instance.player_2 or not instance.winner or instance.status != StatusChoices.TERMINE):
            return  # Ne rien faire si des joueurs sont manquants ou pas de gagnant
        
        winrate_1, _ = Winrate.objects.get_or_create(player=player_1)
        winrate_2, _ = Winrate.objects.get_or_create(player=player_2)
        
        if instance.winner == player_1:
            winrate_1.victory += 1
            winrate_2.defeat += 1
        elif instance.winner == player_2:
            winrate_2.victory += 1
            winrate_1.defeat += 1
        
        winrate_1.save()
        winrate_2.save()
        
    except Exception as e:
        print(f"Erreur dans update_winrate_player pour match {instance.id}: {str(e)}")
