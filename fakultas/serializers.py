from rest_framework import serializers
from .models import Fakultas

class FakultasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fakultas
        fields = '__all__'
