import { faker } from "@faker-js/faker"

// Types
import * as AppTypes from "@/context/App/types"

export const createMockSite = (): AppTypes.SiteInterface => ({
  siteId: faker.string.alphanumeric(),
  inspectorId: faker.string.alphanumeric(),
  name: faker.string.alphanumeric({ length: 20 }),
  preconDate: faker.date.anytime().toISOString().split("T")[0],
  location: faker.location.streetAddress(),
  xCoordinate: faker.number.float(),
  yCoordinate: faker.number.float(),
  permit: faker.string.alphanumeric(),
  cof: faker.number.int().toString(),
  tnq: null,
  greenInfrastructure: true,
  hasOpenViolation: false,
  hasOpenComplaint: false,
  hasOpenIllicitDischarge: false,
  Logs: [],
  ConstructionViolations: [],
  Complaints: [],
  IllicitDischarges: [],
  SiteContacts: [],
  Inspector: createMockInspector(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.alphanumeric()
})

export const createMockInspector = (): AppTypes.InspectorInterface => ({
  inspectorId: faker.string.alphanumeric(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  slug: faker.string.alpha(),
  inactive: false,
  Sites: [],
  Complaints: [],
  IllicitDischarges: [],
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.alphanumeric()
})