from hashids import Hashids
from opusario.settings import SALT


hasher = Hashids(salt=SALT, min_length=16)


validate = {
    'g0': {
        'regex': "^[A-Za-z ]*$",
        'valid': "letters and spaces"
    },
    'g1': {
        'regex': "^[A-Za-z0-9 ]*$",
        'valid': "letters, numbers and spaces"
    },
    'g2': {
        'regex': "^[A-Za-z0-9 ,.;:]*$",
        'valid': "the following punctuation marks , . ; : "
    },
    'g3': {
        'regex': "^[A-Za-z0-9 .]*$",
        'valid': "letters, numbers, spaces and periods"
    },
    'phone_number': {
        'regex': "^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$",
        'valid': "Use one of these formats for phone number: 123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, "
                 "+91 (123) 456-7890."
    },
}
