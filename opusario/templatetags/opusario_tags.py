from django import template

register = template.Library()


@register.filter
def get_widget_class(ob):
    return ob.__class__.__name__


@register.filter
def get_widget_size(obj):
    if obj.__class__.__name__ == "Textarea":
        return 8

    if obj.__class__.__name__ == "TextInput":
        return obj.attrs.get('col-size', 3)

    if obj.__class__.__name__ == 'Select':
        return obj.attrs.get('col-size', 3)

    return 3


@register.filter
def has_ajax(obj):
    if 'data-url' in obj.field.widget.attrs:
        return True
    return False


@register.filter
def get_ajax_url(obj):
    return obj.field.widget.attrs['data-url']


@register.filter
def get_ajax_target(obj):
    return obj.field.widget.attrs['data-target']


@register.filter
def get_goto_path(obj):
    return obj.attrs.get('data-goto', None)
