#!/usr/bin/env python3

from chainlit.input_widget import Select

try:
    widget = Select(id='test', label='', values=['A', 'B'], initial='A')
    print('Widget created successfully')
    print(f'Widget label: "{widget.label}"')
except Exception as e:
    print(f'Error: {e}')
    print(f'Error type: {type(e).__name__}')
