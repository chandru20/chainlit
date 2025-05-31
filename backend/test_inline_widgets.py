#!/usr/bin/env python3
"""
Test script to verify that input widgets are properly integrated inline with MessageComposer.

This script creates a simple Chainlit app with input widgets to test the inline integration.
"""

import chainlit as cl
from chainlit.input_widget import Slider, Select, Switch, TextInput, NumberInput
from chainlit.input_bar import InputBar

@cl.on_chat_start
async def on_chat_start():
    # Create various input widgets to test inline integration
    widgets = [
        Slider(
            id="slider_demo",
            label="Demo Slider",
            min=0,
            max=100,
            initial=50,
            step=1
        ),
        Select(
            id="select_demo", 
            label="Demo Select",
            values=["Option 1", "Option 2", "Option 3"],
            initial="Option 1"
        ),
        Switch(
            id="switch_demo",
            label="Demo Switch", 
            initial=False
        ),
        TextInput(
            id="text_demo",
            label="Demo Text",
            initial="Hello"
        ),
        NumberInput(
            id="number_demo", 
            label="Demo Number",
            initial=42
        )
    ]
    
    # Send widgets to be displayed inline in MessageComposer
    await InputBar.set_widgets(widgets)
    
    await cl.Message(
        content="Input widgets should now be displayed inline within the message composer! Check between the left buttons and the submit button."
    ).send()
