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

    return 3
