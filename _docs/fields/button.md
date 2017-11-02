---
title: Button
---

## Overview

The button field creates a simple button. It doesn't have any value. Usually this field is used to trigger custom JavaScript actions.

## Screenshot

![button](https://i.imgur.com/9ciaST1.png)

## Settings

This field doesn't have any specific settings. It only uses [common field settings](/field-settings/). But there are important settings that you should pay attention to:

Name | Description
--- | ---
`std` | Button text.
`attributes` | Array of custom HTML attributes for button. [More info](/custom-attributes/).

This field doesn't require the `id` attribute.

## Sample code

```php
array(
    'type'       => 'button',
    'name'       => 'Advanced Settings',
    // Button text.
    'std'        => 'Toggle',
    // Custom HTML attributes.
    'attributes' => array(
        'data-section' => 'advanced-section',
        'class'        => 'js-toggle',
    ),
),
```

## Data

This field does not save any value in the database.

## Custom JavaScript

As said above, this field is usually used for custom JavaScript actions. To enqueue a JavaScript file to the admin editing page, use the `rwmb_enqueue_scripts` hook:

```php
add_action( 'rwmb_enqueue_scripts', 'prefix_enqueue_custom_script' );
function prefix_enqueue_custom_script() {
    wp_enqueue_script( 'script-id', get_template_directory_uri() . '/js/admin.js', array( 'jquery' ), '', true );
}
```

And in the `admin.js` script, you can trigger a custom action when click the button:

```js
jQuery( function( $ ) {
    $( '.js-toggle' ).on( 'click', function() {
        // Do something.
    } );
} );
```

Read more about the [rwmb_enqueue_scripts](/actions/) hook.