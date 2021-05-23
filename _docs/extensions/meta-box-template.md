---
title: Meta Box Template
---

Meta Box Template helps you write configuration for meta boxes and custom fields in a human-readable format (YAML).

![meta box template](https://i1.wp.com/metabox.io/wp-content/uploads/2014/12/meta-box-template-file.png)

After installing, please go to *Settings &rarr; Meta Box Template* to add the template for custom meta boxes and custom fields.

### YAML syntax

Before going into details about the syntax, let's look at the demo of 2 meta boxes defined with this plugin as an example:

```yml
#First Meta Box
- title: Profile
  pages: page
  fields:
    - name: Title
      id: prefix_title
      type: radio
      options:
        mr: Mr.
        mrs: Mrs.
        ms: Ms.
    - name: Name
      id: prefix_name
      type: text
    - name: Image
      id: prefix_image
      type: image_advanced
    - name: DOB
      id: prefix_dob
      type: date
      js_options:
        dateFormat: 'd-m-y'

# Second Meta Box
- title: Job Description
  pages: [post, page]
  fields:
    - name: Job Title
      id: prefix_job
      type: select_advanced
      options:
        director: Director
        manager: Marketing Manager
        tech: Technical Supportor
      placeholder: Please select your job title
    - name: Job Description
      id: prefix_job_desc
      type: wysiwyg
      options:
        media_buttons: false
        quicktags: false
```

This will render the following meta boxes:

![meta box](https://i.imgur.com/IpqVqAD.png).

### Basic rules

**Arrays** (YAML calls it *sequences*) use a dash followed by space:

```yml
- Item 1
- Item 2
- Item 3
```

You can also use short syntax like this:

```yml
[Item 1, Item 2, Item 3]
```

Both are equivalent to the following PHP code:

```yml
array( 'Item 1', 'Item 2', 'Item 3');
```

**Associated arrays** (YAML calls it *mappings*) use a colon followed by a space (: ) to mark each key/value pair:

```yml
key1: value1
key2: value2
key3: value3
```

alternatively:

```yml
{key1: value1, key2: value2, key3: value3}
```

which is equivalent to this PHP code:

```yml
array('key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3');
```

**Nested arrays** (sequences or mappings) can be defined with 1 or more spaces:

```yml
fields:
  - name: Name
    id: prefix_name
    type: text
  - name: Image
    id: prefix_image
    type: image_advanced
```

which is equivalent to:

```php
array( 'fields' => array(
    array(
        'name' => 'Name',
        'id' => 'prefix_name',
        'type' => 'text',
    ),
    array(
        'name' => 'Image',
        'id' => 'prefix_image',
        'type' => 'image_advanced',
    ),
) );
```

**Small bits about the syntax**:

- The number of spaces does not matter. But keep the indentation consistent with the same number of spaces.
- Comments can be added by adding `#` at the beginning of the line.
- YAML accepts all data types string, number, booleans, etc.

For more information about using YAML, the Symfony project wrote a very good guide to follow. Check it out [here](https://symfony.com/doc/current/components/yaml/yaml_format.html). If you want the full reference (you don't need to for Meta Box Template), you can read it at [YAML homepage](https://www.yaml.org/spec/1.2/spec.html).

**Note:** To make you easier to type template for meta boxes and fields, the plugin added basic editing functionality like tab, auto closing brackets, etc.

## Creating meta boxes

Each meta box or custom field has a list of the parameters which is written in `key: value` pairs (associated arrays). We use YAML mapping for these parameters.

Please see [this documentation](/creating-meta-boxes/) for list of meta box parameters and [this documentation](/field-settings/) for full list of custom fields parameters.

To register multiple meta boxes or custom fields, we just need to use `- ` to add sequences (simple list).

**Note:** the plugin supports all meta box and custom fields parameters.

**If you register single meta box**, then enter meta box parameters and its fields like this:

```yml
title: Profile
pages: page
fields:
  - name: Title
    id: prefix_title
    type: radio
    options:
      mr: Mr.
      ms: Ms.
  - name: Name
    id: prefix_name
    type: text
  - name: DOB
    id: prefix_dob
    type: date
    js_options:
      dateFormat: 'd-m-y'
```

**If you need to create multiple meta boxes**, use this template:

```yml
#First Meta Box
- title: Profile
  pages: page
  fields:
    - name: Title
      id: prefix_title
      type: radio
      options:
        mr: Mr.
        mrs: Mrs.
        ms: Ms.
    - name: Name
      id: prefix_name
      type: text
    - name: Image
      id: prefix_image
      type: image_advanced
    - name: DOB
      id: prefix_dob
      type: date
      js_options:
        dateFormat: 'd-m-y'

# Second Meta Box
- title: Job Description
  pages: [post, page]
  fields:
    - name: Job Title
      id: prefix_job
      type: select_advanced
      options:
        director: Director
        manager: Marketing Manager
        tech: Technical Supportor
      placeholder: Please select your job title
    - name: Job Description
      id: prefix_job_desc
      type: wysiwyg
      options:
        media_buttons: false
        quicktags: false
```

## Config file

The plugin has an option that allows you to read the configuration from a specific file (`.yaml`), not only from manual input.

To do that, in the plugin settings page, enter the absolute path to the configuration file (`.yaml`). You can put the configuration file in any folder of your website. But for convenience, the plugin supports the following path variables:

Name|Description
--|--
`%wp-content%`|Path to `wp-content` directory, without trailing slash
`%plugins%`|Path to `wp-content/plugins` directory, without trailing slash
`%themes%`|Path to `wp-content/themes` directory. Same as [`get_theme_root()`](https://codex.wordpress.org/Function_Reference/get_theme_root) function, without trailing slash
`%template%`|Path to current theme directory. Same as [`get_template_directory()`](https://codex.wordpress.org/Function_Reference/get_template_directory) function, without trailing slash
`%stylesheet%`|Path to current child theme directory. Same as [`get_stylesheet_directory()`](https://codex.wordpress.org/Function_Reference/get_stylesheet_directory) function, without trailing slash

**Note:** when you change the configuration file, you have to click **Save changes** in the plugin settings page to force it re-parse the file content.
