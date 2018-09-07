from django.db import models

class MuscleGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Exercise(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Session(models.Model):
    name = models.CharField(max_length=100)
    weight = models.PositiveIntegerField()
    warmup = models.BooleanField(default=True)
    complete = models.BooleanField(default=True)

    def __str__(self):
        return f' warmup: {self.warmup}, {self.name} - {self.weight}, complete: {self.complete}'

class Set(models.Model):
    notes = models.TextField(max_length=500, null=True, blank=True)
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE)
    previous = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    warmup = models.BooleanField(default=True)
    complete = models.BooleanField(default=True)
    reps = models.PositiveIntegerField()
    order = models.PositiveIntegerField()
    session = models.ForeignKey('Session', on_delete=models.CASCADE)

    def __str__(self):
        return f' warmup: self.notes, {self.warmup}, self.name, previous: {self.previous}, weight: {self.weight}, reps: {self.reps}, complete: {self.complete}'

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.name
