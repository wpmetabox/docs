---
title: Using the Online Generator
---

[Online Generator](https://metabox.io/online-generator/) is a tool to help you create and set up custom fields using a simple, friendly User Interface. With this tool, all you need to do is drag and drop, then set parameters and options for the fields you want to add. That means, you don’t even need to write one single line of code to work with custom fields.

We hope that this tool would help you save more time and effort than manual coding, especially if you are PHP beginners.

Our Online Generator is part of our Meta Box Builder plugin, build for the same purpose. It has most of the basic features you might need, but if you are looking for more advanced options or integration with other plugins, give Meta Box Builder a try instead.

Below are our instructions of how to use Online Generator. This guide includes simple actions you can apply when using Online Generator.

## Basic requirement to use Online Generator.

Before using Online Generator you need to install Meta Box plugin (If you’re new with Meta Box, please read [here](https://metabox.io/what-is-meta-box-plugin/))

- In the admin Dashboard, go to Plugins, click Add new and look for Meta Box in WordPress plugins list.
- Click Install Now button to install Meta Box.
- After installing, click Activate Plugin to activate the Meta Box plugin.

After installing Meta Box, you can start to set up meta boxes and custom fields right away with Online Generator.

For installation details of Meta Box, check [here](https://docs.metabox.io/installation/).

## Online Generator main parts

On the Online Generator page there are 3 main parts you need to notice to create meta boxes and custom fields:

### 1. General tab:

This is the area where you fill in general information such as function name, text domain name and Field ID Prefix.

![online generator general tab](https://i.imgur.com/AOjFxjb.png)

### 2. Meta Box tab:

This is the area which helps you set up parameters for the meta box you need.

![online generator meta box tab](https://i.imgur.com/HPdXsHk.png)

### 3. Fields tab:

This is the tab you can optionally set up custom fields, includes parameters, actions, orders.

![online generator fields tab](https://i.imgur.com/8ABkxoi.png)

## How to use the Online Generator

### Step 1: Enter general information

In General tab, you will need to enter the function name and text domain for meta box.

- **Function name:** is the callback function name used to register meta boxes. This function name needs to be unique, unrepeatable with any previous functions. We recommend you a use prefix in the name.
- **Text domain:** is used to translate meta boxes’ and fields’ labels and texts into many different languages. If your website is multilingual, you should fill in this field. If your website has been set up with just one language, you can set the value to default.  

![general information](https://i.imgur.com/6g4gGXn.png)

### Step 2: Setup the meta box's parameters

Moving to Meta Box tab, you’ll see several fields that need to be set up for your meta box. Here’s what they really mean:

Parameter|Description
---|---
ID| Meta box ID. This field is not compulsory. If you didn’t type anything in here, meta box’s ID would be automatically created from the title by using the sanitize_title function.
Title| Meta box title. This a very important field and you are asked to fill in the information.
Priority| Order priority when displaying multiple fields. This field is not compulsory. But if your meta box is important and you want users to easily see it, you should set it a high number so meta box will display it on top.
Context| Position you want the meta box placed.
Post type| What kind of post does your meta box belong to? Select your target post types only.
Autosave| Do you want to automatically save custom fields’ values? If yes, tick the box.

![meta box settings](https://i.imgur.com/ggmxRo6.png)

These are explanations of [meta box's parameters](https://docs.metabox.io/creating-meta-boxes/) you should refer to before setting up your meta box.

### Step 3: Add and set up custom fields

Online Generator supports more than 38 custom fields. To create and choose the custom field you want, move to Field tab.

![select a field type](https://i.imgur.com/Sipay0l.png)

In the left column, you’ll see a list of fields. You can search the field you need by entering field type in search section, or looking into each field group. When you found the field type you want to create, just click on it.

Next, you need to set up and configure that custom field. Click on the triangle symbol in the upper right corner (picture) to enlarge the setting frame for your field.

![field settings](https://i.imgur.com/NjGG9Vi.png)

Fill in all information needed for your custom field.

However, as we mentioned earlier, Online Generator is a basic version of Meta Box Builder, so it doesn’t support all the fields/actions that Meta Box supports. In case, you created a custom field and had errors, it might be because Online Generator is not supporting those fields/actions. You can read again [the instructions](https://docs.metabox.io/extensions/meta-box-builder/#customizing-field-settings) and if necessary, you should use [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/) instead.

You can also have other actions in this display such as: delete, duplicate, rearrange custom fields’ orders.

For instance:

Delete 1 custom fields by clicking to the trash bin symbol on the top:

![delete a field](https://i.imgur.com/1CnjjZo.png)

If you want to create another custom field with the same parameters as an existing one, you can choose to duplicate the existing custom field by clicking on the symbol at the top right corner.

These functions can save you a lot of time.

![duplicate a field](https://i.imgur.com/GGvATA1.png)

Or you can move custom fields up and down to adjust their orders by clicking in that field and drag and drop.

![reorder fields](https://i.imgur.com/0KIEAzX.png)

### Step 4: Export code and embed in your website

After you finished configuring your custom fields and meta boxes, you need to export their codes and add them to the website.

Right below the Online Generator Interface, there’s a **Generate code** button that you need to click on to get the code. Copy and paste them into the theme’s `function.php` file or your plugin’s file.

![copy code](https://i.imgur.com/aRE46Mx.png)

You have finished creating meta boxes and custom fields on your website. Now it's time to test them to make sure they work as intended. 

![preview meta box](https://i.imgur.com/QtbAxOj.png)

## Wrapping up

It’s simple and efficient to create meta boxes with the Online Generator tool, isn’t it?

Hope this tool will help you save time building custom meta boxes and custom fields. In addition, the tool is not contained on your website, doesn’t make your site heavier, so your website will run faster and more smooth.

However, just keep in mind that [Online Generator](https://metabox.io/online-generator/) is used for creating basic meta boxes and custom fields. If you want some advanced functions, don’t forget to try [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/).
