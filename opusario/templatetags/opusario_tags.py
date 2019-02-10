from django import template
from talent.models import Myself
from utils import hasher

register = template.Library()


@register.filter
def get_widget_class(ob):
    return ob.__class__.__name__


@register.filter
def get_widget_size(obj):

    # if column size is provided, return it regardless of type
    column_size = obj.attrs.get('col-size', None)
    if column_size:
        return column_size

    # otherwise return default size by widget types
    if obj.__class__.__name__ == "Textarea":
        return 8

    if obj.__class__.__name__ == "TextInput":
        return 4

    if obj.__class__.__name__ == 'Select':
        return 4

    # otherwise return default size
    return 3


@register.filter
def has_ajax(obj):
    if 'data-refresh-url' in obj.field.widget.attrs:
        return True
    return False


@register.filter
def has_modal(obj):
    if 'data-modal-url' in obj.field.widget.attrs:
        return True
    return False


@register.filter
def get_refresh_url(obj):
    return obj.field.widget.attrs['data-refresh-url']


@register.filter
def get_refresh_target(obj):
    return obj.field.widget.attrs['data-refresh']


@register.filter
def get_goto_path(obj):
    return obj.attrs.get('data-next', None)


@register.filter
def get_modal_url(obj):
    return obj.field.widget.attrs['data-modal-url']


@register.filter
def get_modal_dependency(obj):
    try:
        dependency = obj.field.widget.attrs['data-modal-dependency']
    except KeyError:
        return ''
    else:
        return dependency


@register.filter
def get_profile_id(request):
    myself = None
    try:
        myself = Myself.objects.get(user_id=request.user)
    except:
        pass
    else:
        return hasher.encode(myself.pk)
