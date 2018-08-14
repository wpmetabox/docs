---
title: Validation
---

## Overview

The Meta Box plugin has built-in validation module for all fields. You can use validation to make a field required, check password length, check phone number format, etc.

The validation module is built with the popular [jQuery validation plugin](https://jqueryvalidation.org/) which makes client side form validation easy, whilst still offering plenty of customization options. The plugin comes bundled with a useful set of validation methods and an API to write your own methods. All bundled methods come with default error messages in English and translations into 37 other languages.

## Validation rules

To start using validation in Meta Box, you need to add a key `validation` to the meta box settings. This key has a parameter `rules` for validation rules and `messages` for error messages.

Let's look at the example:

```php
'validation' => array(
    'rules'  => array(
        'field_id' => array(
            'required'  => true,
            'minlength' => 7,
            // More rules here
        ),
        // Rules for other fields
    ),
)
```

This example add validation for `field_id` field. There are 2 validation rules for this field: field is required and minimum length is 7.

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

## Built-in validation rules

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
`remote` | Requests a resource to check the element for validity. Value can be URL of the resource to request for server side validation (string) or options to fully customize the request, see [jQuery.ajax](https://api.jquery.com/jQuery.ajax). The server side resource is called via jQuery.ajax and gets a key/value pair corresponding to the name of the validated element and its value as a GET parameter. The response is evaluated as JSON and must be `true` for valid elements, and can be any `false`, `undefined` or `null` for invalid elements, using the default message; or a string, eg. "That name is already taken, try peter123 instead" to display as the error message.

For more details about validation rules, please read the [jQuery validation documentation](https://jqueryvalidation.org/documentation/).

## Error messages

To use custom error messages, you can add another parameter `messages` for `validation` key. This parameter has the same format as `rules`, but it just contains error messages for each rule.

Look at the example below:

```php
'validation' => array(
    'rules'  => array(
        'field_id' => array(
            'required'  => true,
            'minlength' => 7,
        ),
    ),
    // Optional override of default error messages
    'messages' => array(
        'field_id' => array(
            'required'  => 'Password is required',
            'minlength' => 'Password must be at least 7 characters',
        ),
    )
)
```

## Notes

The jQuery validation library actually uses **input name**, not input ID. In most cases, field ID is the same as field name. But for some cases such as field is a checkbox list or is a taxonomy with `field_type` is `checkbox_list`, e.g. where field has multiple inputs, then all those inputs don't have IDs.

In this case, **you need to use input name for the rules**. For example, if you use a taxonomy field with `field_type` is `checkbox_list`, you should set validation rules as follows:

```php
'validation' => array(
    'rules'  => array(
        'my_taxonomy[]' => array(
            'required'  => true,
        ),
    ),
    'messages' => array(
        'my_taxonomy[]' => array(
            'required'  => 'You must select a tag to proceed',
        ),
    ),
),
```
