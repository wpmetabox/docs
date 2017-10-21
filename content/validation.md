---
title: Validation
permalink: /validation/
---

The Meta Box plugin has **built-in validation** module for all fields. You can use validation to make a field required, check password length, check phone number format, etc.

**Technical note:**

The validation module is built with the popular [Query validation plugin](http://jqueryvalidation.org/) which makes simple **client side form validation** easy, whilst still offering **plenty of customization options**. The plugin comes bundled with a useful set of validation methods, while providing an API to write your own methods. All bundled methods come with default error messages in English and translations into 37 other languages.

## How to set validation rules

To start using validation in Meta Box, you need to add an attribute `validation` to your meta box array. This attribute has a parameter `rules` (associated array) for validation rules. Each element of this parameter is a set of rules for one field.

Let's look at the example:

```php
'validation' => array(
    'rules'    => array(
        "{$prefix}password" => array(
            'required'  => true,
            'minlength' => 7,
            // More rules here
        ),
        // Rules for other fields
    ),
)
```

This example add validation for `"{$prefix}password"` field (this is the ID of the field which is prefixed). There are 2 validation rules for this field: field is required and minimum length is 7.

So, basically the format for `rules` is:

```php
'rules' => array(
    'field_id_1' => array(
         // rules for field_id_1
    ),
    'field_id_2' => array(
         // rules for field_id_2
    ),
    // Rules for other fields
),
```

## List of built-in validation rules

These are list of basic validation rules that you can use for your fields:

Name|Description
---|---
`required` | Makes the element required.
`minlength` | Makes the element require a given minimum length.
`maxlength` | Makes the element require a given maxmimum length.
`rangelength` | Makes the element require a given value range. Array.
`min` | Makes the element require a given minimum.
`max` | Makes the element require a given maximum.
`range` | Makes the element require a given value range. Array.
`email` | Makes the element require a valid email
`url` | Makes the element require a valid url
`date` | Makes the element require a date.
`dateISO` | Makes the element require an ISO date.
`number` | Makes the element require a decimal number.
`digits` | Makes the element require digits only.
`creditcard` | Makes the element require a credit card number.
`equalTo` | Requires the element to be the same as another one. Value must be the ID of another field.
`remote` | Requests a resource to check the element for validity. Value can be URL of the resource to request for server side validation (string) or options to fully customize the request, see [jQuery.ajax](http://api.jquery.com/jQuery.ajax). The server side resource is called via jQuery.ajax and gets a key/value pair corresponding to the name of the validated element and its value as a GET parameter. The response is evaluated as JSON and must be `true` for valid elements, and can be any `false`, `undefined` or `null` for invalid elements, using the default message; or a string, eg. "That name is already taken, try peter123 instead" to display as the error message.

For more details about validation rules, please read the [documentation page of jQuery validation plugin](http://jqueryvalidation.org/documentation/).

## Error messages

To use custom error messages, you can add another parameter `messages` for `validation` attribute. This parameter has the same format as `rules`, but it just contains error messages for each rule.

Look at the example below:

```php
'validation' => array(
    'rules'    => array(
        "{$prefix}password" => array(
            'required'  => true,
            'minlength' => 7,
        ),
    ),
    // Optional override of default error messages
    'messages' => array(
        "{$prefix}password" => array(
            'required'  => __( 'Password is required', 'your-prefix' ),
            'minlength' => __( 'Password must be at least 7 characters', 'your-prefix' ),
        ),
    )
)
```