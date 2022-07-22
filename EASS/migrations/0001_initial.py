# Generated by Django 3.1.2 on 2022-05-23 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Departments',
            fields=[
                ('D_name', models.CharField(max_length=24, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('name', models.CharField(max_length=40)),
                ('ID', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('gpa', models.FloatField()),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('phone_number', models.CharField(max_length=11)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('gender', models.CharField(choices=[('Male', 'M'), ('Female', 'F')], max_length=6)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], max_length=8)),
                ('level', models.CharField(choices=[('First Level', 'First'), ('Second Level', 'Second'), ('Third Level', 'Third'), ('Fourth Level', 'Fourth'), ('Masters Student', 'Masters'), ('PHD Student', 'PHD'), ('Graduated', 'Grad')], max_length=20)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='EASS.departments')),
            ],
        ),
    ]