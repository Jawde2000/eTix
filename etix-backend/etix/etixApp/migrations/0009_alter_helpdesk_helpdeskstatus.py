# Generated by Django 3.2.5 on 2021-10-27 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etixApp', '0008_auto_20211027_1144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='helpdesk',
            name='helpdeskStatus',
            field=models.CharField(choices=[('OP', 'Open'), ('CL', 'Close'), ('RP', 'Responded')], max_length=2),
        ),
    ]
