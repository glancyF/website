from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Comment
from .forms import CommentForm

def post_list(request):
    posts = Post.objects.order_by('-created_at')
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    comments = Comment.objects.filter(post=post, parent__isnull=True).order_by('-created_at')
    form = CommentForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        comment = form.save(commit=False)
        comment.post = post

        parent_id = form.cleaned_data.get('parent_id')
        if parent_id:
            try:
                parent_comment = Comment.objects.filter(id=parent_id,post = post).first()
                if parent_comment:
                    comment.parent = parent_comment
            except Comment.DoesNotExist:
                pass

        comment.save()
        return redirect('post_detail', slug=slug)

    return render(request, 'blog/post_detail.html', {
        'post': post,
        'comments': comments,
        'form': form
    })

