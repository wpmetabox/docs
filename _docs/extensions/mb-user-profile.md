---
title: MB User Profile
---

MB User Profile helps you to add information to user profile and edit these details on the front end. It also includes register form, login form and edit profile form that you can embed anywhere using shortcodes.

![user profile page](https://i.imgur.com/bqVnDDF.png)

Note: this extension already includes **MB User Meta**.

## Registration form

```php
[mb_user_profile_register id="meta-box-id"]
```

This shortcode shows the user register form. If you want to add more fields in this form, [create a meta box for users](/extensions/mb-user-meta/) with some fields. Then add the meta box ID in the `id` attribute of the shortcode.

If you have multiple meta boxes that you want to display in the register form, enter their IDs separated by commas.

If the `id` has no value, then it shows the default registration form.

**Shortcode attributes**

Name|Description
---|---
`id`|Meta Box ID(s), separated by commas. All fields from meta boxes will be included in the registration form. If not specify, it shows the default registration form.
`redirect`|Redirect URL, to which users will be redirected after successful registration.
`form_id`|ID (HTML attribute) of the form.
`id_username`|ID (HTML attribute) of the username input field.
`id_email`|ID (HTML attribute) of the email input field.
`id_password`|ID (HTML attribute) of the password input field.
`id_password2`|ID (HTML attribute) of the confirm password input field.
`id_submit`|ID (HTML attribute) of the submit button.
`label_username`|Label for the username input field.
`label_email`|Label for the email input field.
`label_password`|Label for the password input field.
`label_password2`|Label for the confirm password input field.
`label_submit`|Label for the submit button.
`confirmation`|Confirmation message if registrion is succesful.
`email_confirmation`|Send confirmation email when register (you need to setup an email SMTP to make this function work properly). If this param is `true`, system will also check confirmation status when user login. All previous users are set confirmed.
`password_strength`|Set the required password strength. Available options: `strong`, `medium`, `weak`, `very-weak` or `false` to disable password strength meter.
`email_as_username`|Use email for username. If this param is `true`, then the username field will disappear.
`recaptcha_key`|Google reCaptcha site key (version 3). Optional.
`recaptcha_secret`|Google reCaptcha secret key (version 3). Optional.
`show_if_user_can`|Always show the form if the current user has a proper capability. Should be a [WordPress capability](https://wordpress.org/support/article/roles-and-capabilities/). Useful if admins want to register for other people.
`role`|Role for the new user. Default is subscriber (optional).

## Login form

```php
[mb_user_profile_login]
```

This shortcode shows the normal login form. You can use either this shortcode or the WordPress's built-in function `wp_login_form()`.


**Shortcode attributes**

Name|Description
---|---
`redirect`|Redirect URL, to which users will be redirected after successful login.
`form_id`|ID (HTML attribute) of the form.
`id_username`|ID (HTML attribute) of the username input field.
`id_password`|ID (HTML attribute) of the password input field.
`id_remember`|ID (HTML attribute) of the remember checkbox field.
`id_submit`|ID (HTML attribute) of the submit button.
`label_username`|Label for the username input field.
`label_password`|Label for the password input field.
`label_remember`|Label for the remember checkbox field.
`label_lost_password`|Label for the lost password link.
`label_submit`|Label for the submit button.
`confirmation`|Confirmation message if registrion is succesful.
`value_username`|Default value for username field.
`value_remember`|Default value for remember checkbox field - `true` or `false` (default).
`recaptcha_key`|Google reCaptcha site key (version 3). Optional.
`recaptcha_secret`|Google reCaptcha secret key (version 3). Optional.


## Edit profile form

```php
[mb_user_profile_info id="meta-box-id"]
```

This shortcode shows the user profile form that allows users to edit their information. If you want to add more fields in this form, [create a meta box for users](/extensions/mb-user-meta/) with some fields. Then add the meta box ID in the `id` attribute of the shortcode.

If you have multiple meta boxes that you want to display in the profile form, enter their IDs separated by commas.

**Shortcode attributes**

Name|Description
---|---
`id`|Meta Box ID(s), separated by commas. All fields from meta boxes will be included in the profile form. Required.
`user_id`|User ID, whose info will be edited. If not specified, current user ID is used.
`redirect`|Redirect URL, to which users will be redirected after successful submission.
`form_id`|ID (HTML attribute) of the form.
`id_password`|ID (HTML attribute) of the password input field.
`id_password2`|ID (HTML attribute) of the confirm password input field.
`id_submit`|ID (HTML attribute) of the submit button.
`label_password`|Label for the password input field.
`label_password2`|Label for the confirm password input field.
`label_submit`|Label for the submit button.
`confirmation`|Confirmation message if registrion is succesful.
`recaptcha_key`|Google reCaptcha site key (version 3). Optional.
`recaptcha_secret`|Google reCaptcha secret key (version 3). Optional.
`password_strength`|Set the required password strength. Available options: `strong`, `medium`, `weak`, `very-weak` or `false` to disable password strength meter.

### Edit default fields

By default, the user profile form doesn't include any default user fields, such as first name, last name or biography. To be able to edit these fields, please [create a meta box for users](/extensions/mb-user-meta/) and add those fields to that meta box. Keep the same field ID.

For example, the code below creates a meta box for editing user first name, last name and biography:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = [
        'title'  => 'Default Fields',
        'id'     => 'default-fields',
        'type'   => 'user', // NOTICE THIS
        'fields' => [
            [
                'id'   => 'first_name', // THIS
                'name' => 'First Name',
                'type' => 'text',
            ],
            [
                'id'   => 'last_name', // THIS
                'name' => 'Last Name',
                'type' => 'text',
            ],
            [
                'id'   => 'display_name', // THIS
                'name' => 'Display Name',
                'type' => 'text',
            ],
            [
                'id'   => 'description', // THIS
                'name' => 'Biography',
                'type' => 'textarea',
            ],
        ],
    ];
    return $meta_boxes;
} );
```

And use it in the user edit profile form with this shortcode:

```php
[mb_user_profile_info id="default-fields"]
```

In order to make the plugin recognize the user fields, you need to set correct ID for them. See the table below:

Field|ID
---|---
User email|`user_email`
User nicename|`user_nicename`
User URL|`user_url`
Display name|`display_name`
First name|`first_name`
Last name|`last_name`
Registration date|`user_registered`
Biography|`description`
Rich editing|`rich_editing`
Syntax highlighting|`syntax_highlighting`
Admin color|`admin_color`
Comment shortcuts|`comment_shortcuts`
Show admin bar on the front|`admin_bar_front`
User role|`role`

**Note:** These default fields do not work as sub-fields in a group.

### Edit user password

To let users change their password, please use the meta box ID `rwmb-user-info` in the shortcode as below:

```php
[mb_user_profile_info id="rwmb-user-info"]
```

## Hooks

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

Please note that this filter works only for default user fields such as user email or password. For changing custom fields data, please use [rwmb_{field_id}_value](https://docs.metabox.io/filters/#rwmb_field_id_value) filter.

`rwmb_profile_update_user_data`

This filter is used to modify the submitted user data before it's passed to the `wp_update_user` function to **update an existing user**. It accepts 2 parameters: the array of user data and the shortcode parameters.

```php
$data = apply_filters( 'rwmb_profile_update_user_data', $data, $config );
```
Please note that this filter works only for default user fields such as user email or password. For changing custom fields data, please use [rwmb_{field_id}_value](https://docs.metabox.io/filters/#rwmb_field_id_value) filter.

### Form fields filters

To modify the default register, login or edit profile form fields, please use the following filters:

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
