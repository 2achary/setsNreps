# Generated by Django 2.1.1 on 2018-09-12 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20180912_0315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='set',
            name='previous',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='set',
            name='reps',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_number',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='weight',
            field=models.IntegerField(),
        ),
    ]
