from django import forms
from .models import Comment
class CommentForm(forms.ModelForm):
    parent = forms.ModelChoiceField(queryset=Comment.objects.all(), required=False,widget=forms.HiddenInput)
    class Meta:
        model = Comment
        fields = ['name', 'text','parent']