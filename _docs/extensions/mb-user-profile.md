---
title: MB User Profile
---

{% include installation.html %}

**Important:** This extension requires Meta Box version 4.11+. If you're using an older version of the plugin, please update.

## Shortcodes

The extension has the following shortcodes for 3 forms:

**Register form:**

```php
[mb_user_profile_register id="meta-box-id" submit_button="Submit" confirmation="Your account has been created successfully."]
```

This shortcode shows the user register form. If you want to add more fields in this form, [create a meta box](/creating-meta-boxes/) with some fields. Then add the meta box ID in the `id` attribute of the shortcode.

If you have multiple meta boxes that you want to display in the register form, enter their IDs separated by commas.

If the `id` has no value, then it shows the default register form.

**Login form:**

```php
[mb_user_profile_login submit_button="Submit" remember="Remember" lost_pass="Lost Password?" confirmation="You are now logged in."]
```

This shortcode shows the normal login form. You can use either this shortcode or the WordPress's built-in function `wp_login_form()`.

**Edit user profile form:**

```php
[mb_user_profile_info id="meta-box-id" submit_button="Submit" confirmation="Your information has been successfully submitted. Thank you."]
```

This shortcode shows the user profile form that allows users to edit their information. If you want to add more fields in this form, [create a meta box](/creating-meta-boxes/) with some fields. Then add the meta box ID in the `id` attribute of the shortcode.

If you have multiple meta boxes that you want to display in the register form, enter their IDs separated by commas.

**Usage:**

To use these shortcodes, add them into a page content or in a widget. If you want to embed the form using code, please use the following code:

```php
$form = '[mb_user_profile_register]';
echo do_shortcode( $form );
```

## Hooks

In order to allow developers to do other things with the user form, we have created some actions and filters.

### General hooks

`rwmb_profile_redirect`

This filter allows you to change the URL of the redirect page after form is submitted. It accepts 2 parameters: redirect URL and form config - the shortcode attributes.

```php
$redirect = apply_filters( 'rwmb_profile_redirect', $redirect, $config );
```

You can use this filter to change the redirect URL after an user updated his profile.

```php
add_filter( 'rwmb_profile_redirect', function( $redirect, $config ) {
    if ( 'my-meta-box' === $config['id'] ) {
        $redirect = 'https://domain.com/thank-you/';
    }
    return $redirect;
}, 10, 2 );
```

### Form actions

`rwmb_profile_before_process`

This action fires before the form is processed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_after_process`

This action fires after the form is processed, e.g. saved or updated. It accepts 2 parameters:

- `$config` - the form configuration, taken from the shortcode attributes.
- `$user_id` - the submitted user ID

You can use this action to do a custom redirect to your Thank you page or send an email notification.

```php
add_action( 'rwmb_profile_after_process', function( $config, $user_id ) {
    if ( 'my-meta-box' === $config['id'] ) {
        wp_mail( 'admin@domain.com', 'New submission', 'A new user has been just submitted.' );

        wp_safe_redirect( 'thank-you' );
        die;
    }
}, 10, 2 );
```

`rwmb_profile_before_form`

This action fires before form output. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_after_form`

This action fires after form output. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_before_display_confirmation`

This action fires before the confirmation message is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_after_display_confirmation`

This action fires after the confirmation message is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_before_submit_button`

This action fires before the submit button is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_profile_after_submit_button`

This action fires after the submit button is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

### Form fitlers

`rwmb_profile_validate`

This filter is used to check if the form is validated. You can use this filter to add custom check for the data before it's processed.

```php
$is_valid = apply_filters( 'rwmb_profile_validate', $is_valid, $config );
```

### User data filters

`rwmb_profile_insert_user_data`

This filter is used to modify the submitted user data before it's passed to the `wp_insert_user` function to **create a new user**. It accepts 2 parameters: the array of user data and the shortcode parameters.

```php
$data = apply_filters( 'rwmb_profile_insert_user_data', $data, $config );
```

`rwmb_profile_update_user_data`

This filter is used to modify the submitted user data before it's passed to the `wp_update_user` function to **update an existing user**. It accepts 2 parameters: the array of user data and the shortcode parameters.

```php
$data = apply_filters( 'rwmb_profile_update_user_data', $data, $config );
```

### Form fields filters

To modify the defautl register, login or edit profile form fields, please use the following filters:

```php
$fields = apply_filters( 'rwmb_profile_register_fields', $fields );
$fields = apply_filters( 'rwmb_profile_login_fields', $fields );
$fields = apply_filters( 'rwmb_profile_info_fields', $fields );
```

### User actions

`rwmb_profile_before_save_user`

This action fires before the user is created or updated.

```
do_action( 'rwmb_profile_before_save_user', $object );
```

The action accepts 1 parameter: the instance of the `MB_User_Profile_User` class, which handles the submission. It has the following public properties that you can use:

- `$user_id`: The submitted user ID
- `$config`: The configuration, taken from the shortcode attributes

`rwmb_profile_after_save_user`

This action fires after the user is created or updated. At that time, all the custom fields in the meta box are already saved into the user meta.

```
do_action( 'rwmb_profile_after_save_user', $object );
```

The action accepts 1 parameter: the instance of the `MB_User_Profile_User` class, which handles the submission. It has the following public properties that you can use:

- `$user_id`: The submitted user ID
- `$config`: The configuration, taken from the shortcode attributes

## Notes

### Upload files / images

To be able to upload files or images (via fields `file_advanced`, `file_upload`, `image_advanced`, `image_upload`), users have to login and proper capability `upload_files` to access the Media Library. If your users don't have that capability (if they have subscriber role), then the upload fields don't work. In that case, you can add the capability for that role as follows:

```php
function mb_allow_subscriber_uploads() {
    if ( is_admin() ) {
        return;
    }

    // Replace 'subscriber' with the required role to update, can also be contributor.
    $subscriber = get_role( 'subscriber' );
    $subscriber->add_cap( 'upload_files' );
}
add_action( 'init', 'mb_allow_subscriber_uploads' );
```

Another solution is using `file` or `image` fields. Both of them works similar. They just don't have a nice UI, but they do the job very well.

### Styling

The extension outputs the default fields' HTML with CSS comes from Meta Box plugin. The style is basic and works in most cases. However, to make it match perfectly with your theme's style, you need to do some work with CSS.

### Caching

As you might know, Meta Box uses [nonces](https://codex.wordpress.org/WordPress_Nonces) to prevent misuse or malicious requests. As the nonce fields are outputted directly in the HTML, they might be cached by caching plugins such as W3 Total Cache, WP Super Cache, etc. And thus, the verification of the nonce might not work properly and break the form submission. In this case, please do not cache the page where the form is embeded (both caching plugins allow you to do that). For more information, please read this [technical article](https://myatus.com/p/wordpress-caching-and-nonce-lifespan/).
