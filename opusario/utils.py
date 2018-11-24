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
}
