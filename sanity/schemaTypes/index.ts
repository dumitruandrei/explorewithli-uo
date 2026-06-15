import {type SchemaTypeDefinition} from 'sanity'

import {destination} from './destination'
import {journalPost} from './journalPost'
import {itineraryDay} from './objects/itineraryDay'
import {journalSection} from './objects/journalSection'
import {travelPackage} from './objects/travelPackage'
import {review} from './review'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Object types (must be registered before documents that reference them)
    itineraryDay,
    travelPackage,
    journalSection,
    // Documents
    destination,
    review,
    journalPost,
  ],
}
