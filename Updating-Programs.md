# Documentation for Program Page Template

This template is used to display information about the program at our school. Below is a guide to understanding and updating the various parts of this template.

## Template Structure

```html
<extends
  src="parts/programpageHC.htm"
  locals='{
    "headerImg": "index.png", 
    "title": "
  }'
>
  <!-- Various blocks for content -->
</extends>
```

- Change the programspageHC.htm to programspage.htm for non-healthcare programs

## Attributes

- `src`: The source of the base template that this page extends. It's usually a generic program page layout.
- `locals`: Local variables passed into the template. Includes:
- `headerImg`: The path to the header image for this page.
- `title`: The title of the program.

## Blocks

Blocks are sections within the template where content can be inserted or updated. Here are the main blocks and how to modify them:

### `pageTitle`

```html
<block name="pageTitle"> </block>
```

- Description: Defines the title of the page as shown in the browser tab and possibly on the page itself.
- To Update: Change the text within the block to update the page title.

#### `description`

```html
<block name="description">
  <!-- Program Description -->
</block>
```

- Description: Provides a detailed description of the program.
- To Update: Replace the text within the block to change the program description.

#### `duration`

```html
<block name="duration">7 months </block>
```

- Description: Specifies the duration of the program.
- To Update: Modify the text to reflect the correct duration.

#### `curriculum`

```html
<block name="curriculum">To be Announced </block>
```

- Description: Information about the curriculum for the program.
- To Update: Change the text to provide current curriculum details.

#### `certification`

```html
<block name="certification">BC Registry #, Certificate </block>
```

- Description: Lists the certifications or registration numbers associated with the program.
- To Update: Edit the content to reflect updated or new certification information.

#### `compliance`

```html
<block name="compliance"
  >PTIB (Private Training Institutions Branch, Ministry of Advanced Education
  and Future Skills) - Approval Pending</block
>
```

- Description: Provides compliance or approval status.
- To Update: Update the text to show the latest compliance status.

#### `admitRequirementsEFL`

```html
<block name="admitRequirementsEFL">
  <!-- Admission requirements for English as a First Language students -->
</block>
```

- Description: Contains a list of admission requirements for students whose first language is English.
- To Update: Adjust the list items within the block to modify admission requirements.

#### `admitRequirementsESL`

```html
<block name="admitRequirementsESL">
  <!-- Admission requirements for English as a Second Language students -->
</block>
```

- Description: Contains a list of admission requirements for ESL students.
- To Update: Change the list items within the block to update these requirements.

#### `prePractice`

```html
<block name="prePractice">
  <!-- Pre-practice requirements -->
</block>
```

- Description: Lists the pre-practice requirements for students.
- Leave this section out of none-healthcare pages as it does not apply
- To Update: Modify the list items and their descriptions to adjust the pre-practice requirements.

#### `tuition` and Other Fees

```html
<block name="tuition">$15,000</block>
<block name="adminFee">$75</block>
<block name="archivalFee">$10</block>
<block name="fee1Name"></block>
<block name="fee1"></block>
<!-- Additional fee blocks -->
<block name="total">$15,085</block>
```

- Description: These blocks specify various fees associated with the program.
- To Update: Change the amounts to reflect current pricing. Update `fee1Name`, `fee1`, etc., to add additional fees. Leave the contents for the fee name and the fee to leave them empty. _Make Sure the amounts are accurate_

#### `ProgramleadForm`

```html
<block name="ProgramleadForm">
  <div class="has-primary-bg text-white">Coming Soon: 2024</div>
</block>
```

- Description: Used to display announcements or lead forms for the program.
- To Update: Modify the content within the block to change the announcement or form details.
- Note: will create `<include` template for lead form at a later date.

---

### General Guidelines

- **Updating Text**: Simply replace the text within a block to update that section of the page.
- **Adding New Blocks**: To add a new block, use the same `<block name="..."> ... </block>` structure. Make sure to put the block tag in both the template and the data files. The template will update ALL of the pages that use that template.
- **Images**: To update images like the header image, change the path in the `locals` attribute.
