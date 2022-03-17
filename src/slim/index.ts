/**
 * SLIM v2
 * @class
 * */

import SLIMDB from "slim/db.json";
import { SLIMCategory } from "slim/env";

export default class SLIM {
  static get categories() {
    return {
      order: [
        SLIMCategory.Stranger,
        SLIMCategory.Location,
        SLIMCategory.Item,
        SLIMCategory.Monster,
      ],
      [SLIMCategory.Stranger]: {
        order: ["prefix", "type", "suffix"],
        prefix: {
          probability: 0.8,
          theOne: {
            probability: 0.2,
          },
        },
        type: {
          title: 0.7,
          probability: 1,
        },
        suffix: {
          title: {
            probability: 0.33,
          },
          probability: 0.25,
        },
      },
      [SLIMCategory.Location]: {
        order: ["prefix", "type", "suffix"],
        prefix: {
          probability: 0.8,
          possessive: {
            probability: 0.4,
          },
        },
        type: {
          title: 0.5,
          probability: 1,
        },
        suffix: {
          probability: 0.4,
          theOne: {
            probability: 0.33,
          },
        },
      },
      [SLIMCategory.Item]: {
        order: ["prefix", "type", "suffix1", "suffix2"],
        prefix: {
          probability: 0.7,
          possessive: {
            probability: 0.7,
          },
        },
        type: {
          title: 0.5,
          probability: 1,
        },
        suffix1: {
          probability: 0.7,
          possessive: {
            probability: 0.2,
          },
        },
        suffix2: {
          probability: 0.8,
          theOne: {
            probability: 0.33,
          },
        },
      },
      [SLIMCategory.Monster]: {
        order: ["prefix", "type", "suffix"],
        prefix: {
          probability: 0.8,
          theOne: {
            probability: 0.33,
          },
        },
        type: {
          title: 0.6,
          probability: 1,
        },
        suffix: {
          title: {
            probability: 0.5,
          },
          probability: 0.4,
        },
      },
    };
  }

  /**
   * Generates a name of the given category.
   *
   * @param {String} categoryName One of 'stranger', 'location', 'item' or 'monster'.
   * @returns {String}            The resulting name for the given category.
   */
  static generate(categoryName: SLIMCategory) {
    let result = [];
    const parts = [];
    const partIDs = [];
    const category = SLIM.categories[categoryName];

    let collection;
    let part;
    let isType;
    let isTheOne;
    let hasTitle;

    category.order.forEach((categoryID) => {
      if (Math.random() <= category[categoryID].probability) {
        collection = SLIMDB.filter(
          (entry) =>
            Object.keys(entry).includes(categoryName) && entry?[categoryName].includes(categoryID)
        );
        part = collection[Math.ceil(Math.random() * (collection.length - 1))];

        parts.push(part);
        partIDs.push(categoryID);
      }
    });

    result = parts.map((subPart) => subPart.name.charAt(0).toUpperCase() + subPart.name.slice(1));

    partIDs.forEach((partID, index) => {
      part = parts[index];
      isType = SLIM.categories.order.some(
        (subCategoryName) => part[subCategoryName] && part[subCategoryName].includes("type")
      );
      isTheOne = category[partID].theOne && Math.random() <= category[partID].theOne.probability;
      // isPossessive =
      //   category[partID].possessive && Math.random() <= category[partID].possessive.probability;
      hasTitle = category[partID].title && Math.random() <= category[partID].title.probability;

      switch (partID) {
        case "prefix":
          // if it's a noun and not a type and if there's a prefix but no suffix,
          // chance for suffix to be followed by "... One"
          if (part.noun && !isType && !partIDs.includes("suffix") && isTheOne) {
            result.splice(0, 0, "The");
            result.push("One");
          }
          // if it's a location or item, allow possessive if it's a type
          if (["location", "item"].includes(categoryName) && isType) {
            result[index] += "'s";
          }
          break;

        case "suffix":
          // ... chance for suffix to become "..., the [suffix] ...", if it's also a prefix
          if (hasTitle && !part.noun && part[categoryName].includes("prefix")) {
            result[partIDs.indexOf("type")] += ",";
            result.splice(index, 0, "the");
          }
          // normal 'of the'
          else {
            if (isType || part.noun) {
              result.splice(index, 0, "the");
              if (part.noun && !isType && isTheOne) {
                result.push("One");
              }
            }

            result.splice(index, 0, "of");
          }
          break;

        // if there's a first suffix ... (always an item)
        case "suffix1":
          // ... and there's no suffix2, add 'the' (assume it's also a noun)
          if (!partIDs.includes("suffix2")) {
            result.splice(index, 0, "the");
          }
          // ... otherwise if it's another category's type, make it possessive
          else if (isType || part.noun) {
            result[index] += "'s";
          }

          result.splice(index, 0, "of");
          break;

        case "suffix2":
          if (!result.includes("of")) {
            result.splice(index, 0, "of");
          }

          if (isType || part.noun) {
            result.splice(result.indexOf("of") + 1, 0, "the");
            if (part.noun && !isType && isTheOne) {
              result.push("One");
            }
          }
          break;

        default:
          break;
      }
    });

    // if it's only a type, chance of preceding article The Gooch
    if (
      partIDs.length === 1 &&
      partIDs.includes("type") &&
      category.type.title &&
      Math.random() <= category.type.title.probability
    ) {
      result.splice(0, 0, "The");
    }

    return result.join(" ");
  }
}
