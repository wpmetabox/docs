---
title: MB Frontend Submission
---

MB Frontend Submission lets you put forms on the front end via shortcode so users can submit posts.

![submission form](https://i.imgur.com/jfXHqSc.png)

The extension supports post fields and all Meta Box field types and extensions (columns, group, conditional logic, etc.).

## Creating post forms

### Simple form

To create a simple front-end forms, simply put this shortcode in a page content:

```php
[mb_frontend_form post_fields="title,content"]
```

This shortcode will create a simple post form which has only 2 fields: post title and post content.

### Advanced form

If you want to add more fields to the post form (which are custom fields), then you need to [create a meta box first](/creating-meta-boxes/). That meta box should contains all the custom fields you want to add to the post.

Then change the shortcode to:

```php
[mb_frontend_form id="meta-box-id" post_fields="title,content"]
```

If you want to embed the form using code, please use the following code:

```php
$form = '[mb_frontend_form id="meta-box-id" post_fields="title,content"]';
echo do_shortcode( $form );
```

## Shortcode attributes

Attributes|Description
---|---
`id`|Meta box ID(s). If multiple meta boxes, enter their IDs separated by commas.
`ajax`|Enable Ajax submission. `true` or `false` (default).
`edit`|Allow users to edit the post after submitting. `true` or `false` (default).
`allow_delete`|Allow users to delete the submitted post. `true` or `false` (default).
`force_delete`|Whether to delete the submitted post permanently or temporarily (move to Trash).
`post_type`|The submitted post type. Optional. Default is the first post type defined in the meta box. If meta box is made for multiple post types, you should set this attribute to the correct one.
`post_id`|The post ID. Optional. Used when you want to update an existing post. If you want to pass the ID of the current post, set it to `current`.
`post_status`|The status for submitted posts. See [the list here](https://codex.wordpress.org/Post_Status).
`post_fields`|List of post fields you want to show in the frontend, separated by comma. Supported following fields: `title`, `content`, `excerpt`, `date`, `thumbnail`.
`label_title`| Label for post title field.
`label_content` | Label for post content field.
`label_excerpt`| Label for post excerpt field.
`label_date` | Label for post date field.
`label_thumbnail` | Label for post thumbnail field.
`submit_button`|The submit button text.
`delete_button`|The delete button text.
`redirect`|Custom redirect URL.
`confirmation`|The text for the confirmation message when the form is successfully submitted.
`delete_confirmation`|The text for the confirmation message when the post is deleted.
`recaptcha_key`|Google reCaptcha site key (version 3). Optional.
`recaptcha_secret`|Google reCaptcha secret key (version 3). Optional.

## Dynamic population

In order to make the frontend form flexible, sometimes it's more convenient to set the shortcode attributes via code or something else rather than fixed it in above format.

The dyanamic population feature in MB Frontend Submission extension allows you to dynamically populate a shortcode attribute with a value. This value can be passed via query string and/or hook.

### Query string

You can populate post ID for the shortcode via the query string by appending the dynamic population parameter for the attribute to the end of your form URL along with your custom value.

```
http://siteurl.com/form-url/?rwmb_frontend_field_post_id=123
```

The query parameter is `rwmb_frontend_field_post_id`.

Note that *only* post ID is supported for populating via query string since version 2.2.0.

### Hooks

Shortcode attributes can also be populated via WordPress hooks. This example below change the `post_id` to `123`:

```php
add_filter( 'rwmb_frontend_field_value_post_id', 'my_custom_population_function', 10, 2 );
function my_custom_population_function( $value, $args ) {
    if ( $args['id'] === 'your_meta_box_id' ) { // Only filter for a specific form.
        $value = 123;
    }
    return $value;
}
```

This snippet would be pasted in your theme's `functions.php` file or your plugin's PHP file.

The filter has the following format:

```php
$value = apply_filters( "rwmb_frontend_field_value_{$attribute}", $value, $args );
```

The callback function accepts 2 parameters: the attribute value and the array of all attributes. You should use `$args['id]` to check if you're filter for the right form.

## Post template files

The plugin allows you to use a custom template files for post fields and the confirmation message (the fields defined by Meta Box is controlled by the Meta Box plugin and can't be changed).

The plugin will look for a template file with the following order:

- Inside a folder `mb-frontend-submission` of your child theme
- Inside a folder `mb-frontend-submission` of your parent theme
- In the plugin's `templates` folder

In order to overwrite the output of post fields, please following the steps below:

- Create a folder `mb-frontend-submission` in your theme.
- Copy a template file that you want to change from plugins's `templates` folder to the new `mb-frontend-submission` folder, keeping the same folder structure.
- Modify the new template file.

## Reorder post fields

Sometimes you want to mix post fields with the custom fields, or change post content to `textarea` field. You can do that with the following steps:

- Remove the `post_fields` attribute from the shortcode
- Add post fields as normal custom fields to your meta box settings, like this:

```php
$meta_boxes[] = [
    'title'  => 'Bill Submit',
    'id'     => 'bill',
    'fields' => [
        [
            'name' => 'Submission Date',
            'id'   => 'submission_date',
            'type' => 'date',
        ],
        [
            'name' => 'Title',
            'id'   => 'post_title', // THIS
        ],
        [
            'name'    => 'Type',
            'id'      => 'type',
            'type'    => 'select',
            'options' => [
                'docs'    => 'Document',
                'receipt' => 'Receipt',
            ],
        ],
        [
            'name' => 'Description',
            'type' => 'textarea',
            'id'   => 'post_content', // THIS
        ],
        [
            'name' => 'Thumbnail',
            'type' => 'single_image',
            'id'   => '_thumbnail_id', // THIS
        ],
    ],
]
```

In order to make the plugin recognize the post fields, you need to set correct ID for them. See the table below:

Field|ID
---|---
Post title|`post_title`
Post content|`post_content`
Post excerpt|`post_excerpt`
Post date|`post_date`
Post thumbnail|`_thumbnail_id`

With this method, you're able to set the label for post fields, or change settings (even field type) for them easily using any Meta Box [field settings](/field-settings).

## Validation

There are 2 ways to validate fields: on the front end with JavaScript and on the back end with PHP.

For front-end validation with JavaScript, please see [this documentation](https://docs.metabox.io/validation/).

To validate on the back end with PHP, please use the `rwmb_frontend_validate` filter as follows:

```php
add_filter( 'rwmb_frontend_validate', function( $validate, $config ) {
    // Check only if you're on the right form.
    if ( 'your-meta-box-id' !== $config['id'] ) {
        return $validate;
    }
    // Check if users have selected files for an image upload field.
    if ( empty( $_POST['image_upload_field'] ) ) {
        $validate = false; // Return false to show an error message.
    }
    return $validate;
}, 10, 2 );
```

If you want to show a custom error message, simply return a string for the filter, like this:


```php
add_filter( 'rwmb_frontend_validate', function( $validate, $config ) {
    if ( 'your-meta-box-id' !== $config['id'] ) {
        return $validate;
    }
    if ( empty( $_POST['image_upload_field'] ) ) {
        $validate = 'Please select at least one image to upload'; // Return a custom error message
    }
    return $validate;
}, 10, 2 );
```

## User Posts Dashboard

To let users **view and edit their submitted posts**, just create a normal WordPress page, and insert the following shortcode into the page content:

```php
[mb_frontend_dashboard edit_page="124"]
```

**Shortcode attributes**

Attributes|Description
---|---
`edit_page`|The ID of the page, where users can submit posts.
`show_welcome_message`|Show the welcome message `true` (default) or `false`.
`columns`|List of columns to be displayed in the dashboard, separated by comma. Supported values are: `title`, `date`, `status`.
`label_title`|The header label for the title column.
`label_date`|The header label for the date column.
`label_status`|The header label for the status column.
`label_actions`|The header label for the actions column.
`title_link`|The link action for the post titles. Supported values are: `edit` or `view` (default)
`add_new`|Label for the add new button.

And when users visit this page, they'll see a dashboard like this:

![user posts dashboard](https://i.imgur.com/LxPh4xH.png)

On this dashboard, users can:

- View list of their submitted posts with the corresponding statuses
- Edit or delete submitted posts
- Or submit a new post

There's no settings or coding required from users!

And the plugin is smart enough to detect the correct settings from the submission form to correct posts. So you can have *multiple* submission forms and multiple dashboards on a same website.

## Hooks

In order to allow developers to do other things when the form is submitted, we have created some actions and filters.

### General hooks

`rwmb_frontend_redirect`

This filter allows you to change the URL of the redirect page after form is submitted. It accepts 1 parameter `$config` - the shortcode attributes.

```php
$redirect = apply_filters( 'rwmb_frontend_redirect', $redirect, $config );
```

Note that `$config['post_id']` has the submitted post ID.

Example: redirect to a page based on a submitted value:

```php
add_filter( 'rwmb_frontend_redirect', function( $redirect, $config ) {
    // Make sure you work on the correct form.
    if ( 'my-id' !== $config['id'] ) {
        return $redirect;
    }

    // Get submitted data via $_POST.
    $value = empty( $_POST['field_id'] ) ? null : $_POST['field_id'];
    if ( 'yes' === $value ) {
        $redirect = 'https://yourdomain.com/custom-page/';
    }
    return $redirect;
}, 10, 2 );
```

`mbfs_dashboard_query_args`

This filter is used for changing the query args for getting posts in the dashboard page. By default, the plugin will get posts that have the same author as the current user. If you want to change this query, then use this filter.

```php
add_filter( 'mbfs_dashboard_query_args', function( $args ) {
    $args['cat'] = 1; // Get only posts in category ID = 1.
    
    return $args;
} );
```

### Form actions

`rwmb_frontend_before_process`

This action fires before the form is processed, e.g. saved or updated. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_after_process`

This action fires after the form is processed, e.g. saved or updated. It accepts 2 parameters:

- `$config` - the form configuration, taken from the shortcode attributes.
- `$post_id` - the submitted post ID

You can use this action to do a custom redirect to your Thank you page or send an email notification.

```php
add_action( 'rwmb_frontend_after_process', function( $config, $post_id ) {
    if ( 'my-meta-box' === $config['id'] ) {
        wp_mail( 'admin@domain.com', 'New submission', 'A new post has been just submitted.' );

        wp_safe_redirect( 'thank-you' );
        die;
    }
}, 10, 2 );
```

`rwmb_frontend_before_form`

This action fires before form output. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_after_form`

This action fires after form output. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_before_display_confirmation`

This action fires before the confirmation message is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_after_display_confirmation`

This action fires after the confirmation message is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_before_submit_button`

This action fires before the submit button is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_after_submit_button`

This action fires after the submit button is displayed. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_before_delete`

This action fires before the post is deleted. It accepts one parameter `$config` - the form configuration, taken from the shortcode attributes.

`rwmb_frontend_after_delete`

This action fires after the post is deleted. It accepts 2 parameters:

- `$config` - the form configuration, taken from the shortcode attributes.
- `$post_id` - the deleted post ID

### Form filters

`rwmb_frontend_validate`

This filter is used to check if the form is validated. You can use this filter to add custom check for the data before it's processed.

```php
apply_filters( 'rwmb_frontend_validate', $validate, $config );
```

The filter has 2 parameter:

- `$validate`: the returned value of validation. If `true`, then the validation is successful. `false` - if not and the plugin will show a default error message. If you want to show a custom error message, just return it as a string. See the **Validation** section above.
- `$config`: the form configuration.

### Post data filters

`rwmb_frontend_insert_post_data`

This filter is used to modify the submitted post data before it's passed to the `wp_insert_post` function to **create a new post**. It accepts 2 parameters: the array of post data and the shortcode parameters.

```php
$data = apply_filters( 'rwmb_frontend_insert_post_data', $data, $config );
```

`rwmb_frontend_update_post_data`

This filter is used to modify the submitted post data before it's passed to the `wp_update_post` function to **update an existing post**. It accepts 2 parameters: the array of post data and the shortcode parameters.

```php
$data = apply_filters( 'rwmb_frontend_update_post_data', $data, $config );
```

### Post field filters

Sometimes you want to add more things to the post fields, such as make post title required, add description for post content, or even add a custom HTML before the post thumbnail. You can do that with the following post filter:

```php
// Post title
$field = apply_filters( 'rwmb_frontend_post_title', array(
    'type' => 'text',
    'name' => 'Title',
    'id'   => 'post_title',
) );

// Post thumbnail
$field = apply_filters( 'rwmb_frontend_post_thumbnail', array(
    'type'             => 'image',
    'name'             => 'Thumbnail',
    'id'               => '_thumbnail_id',
    'max_file_uploads' => 1,
) );

// Post excerpt
$field   = apply_filters( 'rwmb_frontend_post_excerpt', array(
    'type' => 'textarea',
    'name' => 'Excerpt',
    'id'   => 'post_excerpt',
) );

// Post date
$field = apply_filters( 'rwmb_frontend_post_date', array(
    'type' => 'datetime',
    'name' => 'Date',
    'id'   => 'post_date',
) );

// Post content
$field   = apply_filters( 'rwmb_frontend_post_content', array(
    'type' => 'wysiwyg',
    'name' => 'Content',
    'id'   => 'post_content',
) );
```

Each post field is treated as a normal Meta Box field (see here for full list of [field attributes](/docs/field-settings/)).

So, to make the post title required, you can do like this:

```php
add_filter( 'rwmb_frontend_post_title', function( $field ) {
    $field['required'] = true;
    return $field;
} );
```

### Post actions

`rwmb_frontend_before_save_post`

This action fires before the post is created or updated.

```
do_action( 'rwmb_frontend_before_save_post', $object );
```

The action accepts 1 parameter: the instance of the `\MBFS\Post` class, which handles the submission. It has the following public properties that you can use:

- `$post_type`: The current post type
- `$post_id`: The submitted post ID
- `$fields`: The post fields
- `$config`: The configuration, taken from the shortcode attributes

`rwmb_frontend_after_save_post`

This action fires after the post is created or updated. At that time, all the custom fields in the meta box are already saved into the post meta.

```
do_action( 'rwmb_frontend_after_save_post', $object );
```

The action accepts 1 parameter: the instance of the `\MBFS\Post` class, which handles the submission. It has the following public properties that you can use:

- `$post_type`: The current post type
- `$post_id`: The submitted post ID
- `$fields`: The post fields
- `$config`: The configuration, taken from the shortcode attributes

## Upload files / images with the media popup

To be able to upload files or images with the media popup (via fields `file_advanced`, `file_upload`, `image_advanced`, `image_upload`), users have to login and proper capability `upload_files` to access the Media Library. If your users don't have that capability (if they have subscriber role), then the upload fields don't work. In that case, you can add the capability for that role as follows:

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

## Use the media popup for post thumbnail

Another improvement you might want to add is use the media popup to pick an image as the post thumbnail. By default, it uses `image` field, which provides a simple input for image.

To do that, you need to change the field type for thumbnail from `image` to `single_image`. Here are the steps:

- Create a folder `mb-frontend-submission` in your theme, inside that folder, create a sub-folder `post`.
- Copy the file `thumbnail.php` from the plugin's `templates/post` folder to the `post` folder above.
- Replace the content of the copied `thumbnail.php` with [this code](https://pastebin.com/6AFcPF7b).

Please note that, in order to open the media popup, users need to log in and have proper capability. See the section above for how to do that.

## Embedding forms on other sites (via iframe)

If you have a front-end submission form on site A, then you want to output it on site B by embedding the form within an iframe, there might be a problem with the cookie policy on browsers that prevent the from from submitting.

To make it work please add this snippet to `functions.php` in your theme on site A:

```php
add_action( 'template_redirect', 'your_prefix_init_session', 9 );
function your_prefix_init_session() {
    if ( session_status() === PHP_SESSION_NONE && ! headers_sent() ) {
        $currentCookieParams = session_get_cookie_params();

        session_set_cookie_params(
            $currentCookieParams["lifetime"],
            '/; samesite=None',
            $_SERVER['HTTP_HOST'],
            true,
            false
        );
        session_start();
    }
}
```

The snippet above will set the cookie setting `samesite=None` and `Security=true`. Note that you can only use it on the sites that use HTTPS (connection security) and on Chrome and Firefox. It doesn't work on Safari because Safari is blocking third party cookies. Setting `samesite=None` also might be a security issue, so please be sure you really want to do that. For more details, please [see this article](https://web.dev/samesite-cookies-explained/).

## Notes

### Styling

The extension outputs the default fields' HTML with CSS comes from Meta Box plugin. The style is basic and works in most cases. However, to make it match perfectly with your theme's style, you need to do some work with CSS.

### Caching

As you might know, Meta Box uses [nonces](https://codex.wordpress.org/WordPress_Nonces) to prevent misuse or malicious requests. As the nonce fields are outputted directly in the HTML, they might be cached by caching plugins such as W3 Total Cache, WP Super Cache, etc. And thus, the verification of the nonce might not work properly and break the form submission. In this case, please do not cache the page where the form is embeded (both caching plugins allow you to do that). For more information, please read this [technical article](https://myatus.com/p/wordpress-caching-and-nonce-lifespan/).

## Tutorials

- [MB Frontend Submission: Dashboard, Ajax, reCaptcha & More](https://metabox.io/mb-frontend-submission-dashboard-ajax-recaptcha/)
- How to Add Guest Author in WordPress using Meta Box: [Part 1](https://metabox.io/p1-add-guest-author-in-wordpress/) & [Part 2](https://metabox.io/p2-add-guest-author-in-wordpress/).
- [How to Create a Classified Ads Website using Meta Box](https://metabox.io/create-classified-ads-website-using-meta-box/)
