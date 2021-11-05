---
title: Sanitization
---

To ensure the user input is safe to save to the database, Meta Box provides a mechanism to sanitize fields' values. The sanitization is automatically applied for all built-in field types. For some fields such as select or radio, Meta Box also validates the submitted value to ensure it's a valid value (e.g. available in the field options).

The sanitization is applied for both single and cloneable fields. With cloneable fields, the sanitization is applied for each cloned value.

## Default sanitize callbacks

We try to provide appropriate callbacks for built-in field types and use built-in WordPress sanitization functions as much as possible.

To see the list of default sanitize callbacks, please [see the plugin source code](https://github.com/wpmetabox/meta-box/blob/master/inc/sanitizer.php#L50).

Quick notes:

- `textarea`: the default callback is `wp_kses_post`. If you want to enter scripts and styles in a `textarea` field (like you make an option in [a settings page](https://metabox.io/plugins/mb-settings-page/) that allows users to enter Google Analytics code), then you need to use a custom sanitize callback.
- Choice fields (`select`, `radio`, `button_group`, etc.): a custom callback is used which validates the input to make sure it's a valid value (e.g. available in the field options).
- [Group field](https://metabox.io/plugins/meta-box-group/) is not sanitized due to its complexity.

## Custom sanitize callback

To provide a custom sanitize callback for a field, please pass [a callback](https://secure.php.net/manual/en/language.types.callable.php) to the `sanitize_callback` parameter.

For example, the code below auto add a currency symbol "$" to a text field if it's missed:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = [
        'title' => 'Test Sanitization Money Field',
        'fields' => [
            [
                'type'              => 'text',
                'id'                => 'amount',
                'name'              => 'Amount',
                'sanitize_callback' => 'prefix_sanitize_money_field',
            ]
        ],
    ];
    return $meta_boxes;
} );

function prefix_sanitize_money_field( $value ) {
    if ( 0 !== strpos( $value, '$' ) ) {
        $value = '$' . $value;
    }
    return $value;
}
```

The sanitize callback is passed 4 parameters as follows:

- `$value`: The submitted value
- `$field`: The field settings
- `$old_value`: The old value which is in the database
- `$object_id`: The current object ID

So your sanitize callback might look like this:

```php
function prefix_custom_sanitize_callback( $value, $field, $old_value, $object_id ) {
    // Do something with $value.
    
    return $value;
}
```

If you don't need all parameters, you can just omit them from the function param list, like we did in the example with the money field above.

## Bypass the sanitization

If you don't want to sanitize the input value for a specific field (we don't encourage this, obviously), then simply set the `sanitize_callback` to `none`:

```php
[
    'type'              => 'text',
    'id'                => 'amount',
    'name'              => 'Amount',
    'sanitize_callback' => 'none',
]
```

In this case, whatever users input will be saved.

{% include alert.html type="info" content="If you're using [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/), please go to **Advanced** tab and add a custom attribute with name `sanitize_callback` and value `none`. See the screenshot below:" %}

![adding sanitize callback to fields](https://imgur.com/9UyYN71.png)

## Sanitize custom field types

If you create [a custom field type](https://docs.metabox.io/custom-field-type/), then you need to implement a default sanitize callback for that type.

To do this, please set the `sanitize_callback` param for the field in the `normalize` method as follows:

```php
class RWMB_MyType_Field extends RWMB_Field {
    public static function normalize( $field ) {
        $field = wp_parse_args( $field, array(
            'sanitize_callback' => [ __CLASS__, 'custom_sanitize' ],
        ) );
        $field = parent::normalize( $field );
        return $field;
    }

    public static function custom_sanitize( $value, $field, $old_value, $object_id ) {
        // Do something with $value.
        return $value;
    }
}
```

Note that, the sanitize callback don't need to use all of the 4 passed parameters.

This is an example of a custom `money` field, where the value must have "$" prefixed:

```php
class RWMB_Money_Field extends RWMB_Text_Field {
    public static function normalize( $field ) {
        $field = wp_parse_args( $field, array(
            'sanitize_callback' => [ __CLASS__, 'custom_sanitize' ], // Specify a custom sanitize callback.
        ) );
        $field = parent::normalize( $field );
        $field['attributes']['type'] = 'text'; // Set the `type` attribute to `text` to let users enter the data.
        return $field;
    }

    public static function custom_sanitize( $value ) {
        if ( 0 !== strpos( $value, '$' ) ) {
            $value = '$' . $value;
        }
        return $value;
    }
}

add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = [
        'title' => 'Test Sanitization Money Field',
        'fields' => [
            [
                'type' => 'money', // Set the field type to the custom 'money' type.
                'id'   => 'amount',
                'name' => 'Amount',
            ]
        ],
    ];
    return $meta_boxes;
} );
```
