/**
 * LOCRA
 * @class
 * */

import affixes from "locra/db-affixes.json";
import artifact from "locra/db-artifacts.json";
import creatures from "locra/db-creatures.json";
import location from "locra/db-locations.json";

import { AffixTags, ArmorType, ArtifactType, ShieldType, WeaponType } from "locra/env.d";

export default class LOCRA {
  /**
   * Generates an Artifact name with the given parameters.
   *
   * @param {}
   * @returns {String}        The resulting name for the Artifact.
   */
  static generateArtifact({
    hasPrefix = false,
    hasSuffix = false,
    isNSFW = false,
    prefixTags = [],
    suffixTags = [],
    subtype,
    type,
  }: {
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    isNSFW?: boolean;
    prefixTags?: AffixTags[];
    suffixTags?: AffixTags[];
    subtype: ArmorType | ShieldType | WeaponType;
    type: ArtifactType;
  }) {
    // TODO
  }

  static generateCreature() {
    // TODO
  }

  static generateLocation() {
    // TODO
  }
}
