# Generated by Django 3.2.6 on 2021-08-27 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etixApp', '0007_alter_user_userid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Row',
            fields=[
                ('rowID', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('capacity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('seatID', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('status', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='SeatType',
            fields=[
                ('seatTypeID', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('seatTypeName', models.TextField(max_length=1000)),
                ('seatTypePrice', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('seatTypeQuantity', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='userID',
            field=models.TextField(default='<function generate_user_id at 0x000002891B01E4C0>', editable=False, max_length=8, primary_key=True, serialize=False, unique=True),
        ),
    ]
