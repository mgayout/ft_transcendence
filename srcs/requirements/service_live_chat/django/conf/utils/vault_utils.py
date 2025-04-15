import hvac
def get_vault_secrets():
    try:
        # Initialisation du client Vault
        client = hvac.Client(url='http://vault:8200', token='hvs.CAESIF6v50ZvPUOiMKNWlwUcgq2Gfc1PddbmovzldYVJycAtGh4KHGh2cy5Bb05sanZCdFNMbllsZUhDd016NWk3OUk')

        if not client.is_authenticated():
            raise Exception("Authentification échouée avec Vault")
        
        # Récupération des secrets depuis Vault
        secret = client.secrets.kv.v1.read_secret(path='my-django-app')['data']
        
        # Extraction des valeurs spécifiques
        db_password = secret.get('db_password')
        
        return {
            'db_password': db_password
        }
    except Exception as e:
        print(f"Erreur lors de la récupération des secrets Vault : {e}")
        return None
