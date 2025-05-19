from django.contrib import admin
from pong.models import Article

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('titre','contenu', 'date_creation')

admin.site.register(Article, ArticleAdmin)
