---
title: Password
---

## Overview

The password field creates a simple password input. The password is encrypted by [wp_hash_password()](https://codex.wordpress.org/Function_Reference/wp_hash_password) before saving into the database to make sure it's safe.

## Screenshot

![password](https://i.imgur.com/xozZVMx.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`size` | Input size. Default `30`. Optional.

## Sample code

```php
array(
    'name' => 'Password',
    'id'   => 'password',
    'type' => 'password',
),
```

## Data

This field saves the encrypted password in the database for a better security. The password is encrypted by [wp_hash_password()](https://codex.wordpress.org/Function_Reference/wp_hash_password) function.

## Template usage

As the password is encrypted in the database, you cannot get the original password via code. There's no reversing function that can turn a password hash into the original one. Otherwise, it will be insecure.

Instead of trying to get the original password, you should check the saved password is correct, like this:

```php
$value = rwmb_meta( $field_id );
// Or if you want to get the field value from a specific post:
// $value = rwmb_meta( $field_id, '', $post_id );

if ( wp_check_password( 'password to check', $value ) ) {
    echo 'Password is correct';
}
```

Read more about [rwmb_meta()](/rwmb-meta/).
