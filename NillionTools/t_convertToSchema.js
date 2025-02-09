import { readFileSync, writeFileSync } from 'fs';

// Function to extract required fields from properties
function getRequiredFields(properties) {
  return Object.keys(properties);
}

// Function to transform simplified schema to JSON Schema
function transformToJsonSchema(inputSchema) {
  // Validate input schema structure
  if (!inputSchema.schemaName || !Array.isArray(inputSchema.fields)) {
    throw new Error('Invalid input schema format');
  }

  // Create base schema structure
  const jsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": inputSchema.schemaName,
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "format": "uuid",
          "coerce": true
        }
      },
      "required": ["_id"]
    }
  };

  // Transform fields
  inputSchema.fields.forEach(field => {
    if (!field.field || !field.type) {
      throw new Error(`Invalid field definition: ${JSON.stringify(field)}`);
    }

    // Add to required fields
    jsonSchema.items.required.push(field.field);

    // Handle array type
    if (field.type === "array") {
      const arraySchema = {
        "type": "array",
        "items": {
          "type": "object",
          "properties": field.items.properties,
          "required": getRequiredFields(field.items.properties)
        },
        "minItems": 1
      };

      // If the field is secret, wrap it in a $share object
      if (field.isSecrect) {
        jsonSchema.items.properties[field.field] = {
          "type": "object",
          "properties": {
            "$share": arraySchema
          },
          "required": ["$share"]
        };
      } else {
        jsonSchema.items.properties[field.field] = arraySchema;
      }
    }
    // Handle non-array types
    else {
      if (field.isSecrect) {
        jsonSchema.items.properties[field.field] = {
          "type": "object",
          "properties": {
            "$share": {
              "type": field.type
            }
          },
          "required": ["$share"]
        };
      } else {
        jsonSchema.items.properties[field.field] = {
          "type": field.type
        };
      }
    }
  });

  return jsonSchema;
}

// Function to process the files
function processSchemaFiles(inputFile, outputFile) {
  try {
    // Read the input file
    const inputData = readFileSync(inputFile, 'utf8');
    const inputSchema = JSON.parse(inputData);

    // Transform the schema
    const jsonSchema = transformToJsonSchema(inputSchema);

    // Write to output file
    writeFileSync(outputFile, JSON.stringify(jsonSchema, null, 2));
    console.log(`Schema successfully transformed and saved to ${outputFile}`);
  } catch (error) {
    console.error('Error processing schema:', error.message);
    process.exit(1);
  }
}

// Get command line arguments
const [inputFile, outputFile] = process.argv.slice(2);

// Validate command line arguments
if (!inputFile || !outputFile) {
  console.error('Usage: node script.js <input-file> <output-file>');
  process.exit(1);
}

// Process the files
processSchemaFiles(inputFile, outputFile);