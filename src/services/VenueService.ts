import type { Ability } from '@casl/ability';
import { ForbiddenError } from '@casl/ability';
import VenueModel from 'src/models/VenueModel';
import { pick } from 'lodash';
import dbConnect from 'src/lib/dbConnect';

/**
 * Creates a new venue.
 * @param ability Requesting user's ability.
 * @param data The new venue data.
 * @returns New venue.
 */
export async function createVenue(ability: Ability, data: Record<string, any>) {
  ForbiddenError.from(ability).throwUnlessCan('create', 'Venue');
  await dbConnect();
  const venue = new VenueModel(data);
  await venue.save();
  return venue;
}

/**
 * Lists all venues.
 * @param ability Requesting user's ability.
 * @returns Array of venues.
 */
export async function listVenues(ability: Ability) {
  await dbConnect();
  const venues = await VenueModel.accessibleBy(ability).find().exec();
  return venues.map((venue) => pick(venue, venue.accessibleFieldsBy(ability)));
}

export async function getVenueById(ability: Ability, id: string) {
  await dbConnect();
  // findById isn't included in QueryWithHelpers interface for unknown reason so use findOne instead
  const venue = await VenueModel.accessibleBy(ability)
    .findOne({ _id: id })
    .orFail()
    .exec();
  return pick(venue, venue.accessibleFieldsBy(ability));
}
