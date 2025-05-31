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
            label="",  # Empty label to save mobile space
            values=["Option 1", "Option 2", "Option 3"],
            initial="Option 1"
        ),
        Switch(
            id="switch_demo",
            label="",  # Empty label for compact display
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

@cl.on_message
async def on_message(message: cl.Message):
    # Get current widget values
    widget_values = {}
    widgets = [
        "slider_demo", "select_demo", "switch_demo", 
        "text_demo", "number_demo"
    ]
    
    for widget_id in widgets:
        try:
            value = cl.user_session.get(widget_id, "Not set")
            widget_values[widget_id] = value
        except:
            widget_values[widget_id] = "Error getting value"
    
    response = f"Message received: {message.content}\n\nCurrent widget values:\n"
    for widget_id, value in widget_values.items():
        response += f"- {widget_id}: {value}\n"
    
    await cl.Message(content=response).send()

if __name__ == "__main__":
    cl.run()
