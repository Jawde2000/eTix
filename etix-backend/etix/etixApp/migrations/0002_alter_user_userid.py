# Generated by Django 3.2.8 on 2021-10-23 16:48

from django.db import migrations, models
import etixApp.models


class Migration(migrations.Migration):

    dependencies = [
        ('etixApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='userID',
            field=models.TextField(default=etixApp.models.generate_user_id, editable=False, max_length=8, primary_key=True, serialize=False, unique=True),
        ),
    ]
