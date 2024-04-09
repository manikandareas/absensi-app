import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  uuid,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at').default(sql`CURRENT_TIMESTAMP`);
const updatedAt = timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`);
const generateUUID = sql`gen_random_uuid()`;

export type Geolocation = {
  latitude: number;
  longitude: number;
};

export enum UserRole {
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
}

export enum PresencesStatus {
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
}

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  whatsApp: varchar('whats_app'),
  telegram: varchar('telegram'),
  numberPhone: varchar('number_phone'),
  instagram: varchar('instagram'),
  facebook: varchar('facebook'),
  userId: uuid('user_id').unique().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(generateUUID),
  name: varchar('name').notNull(),
  universityId: varchar('university_id').unique(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  role: varchar('role').notNull(),
  contactsId: integer('contacts_id').references(() => contacts.id, {
    onDelete: 'cascade',
  }),
  createdAt,
  updatedAt,
});

export const userRole = pgTable('user_role', {
  role: varchar('role').primaryKey(),
});

export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().default(generateUUID),
  title: varchar('title').notNull(),
  description: text('description'),
  lecturerId: uuid('lecturer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  slug: varchar('slug').unique(),
  invitationToken: varchar('invitation_token').unique(),
  createdAt,
  updatedAt,
});

export const userClasses = pgTable('user_classes', {
  id: serial('id').primaryKey(),
  classId: uuid('class_id')
    .notNull()
    .references(() => classes.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const presencesStatus = pgTable('presences_status', {
  status: varchar('status').primaryKey(),
});

export const barcodes = pgTable('barcodes', {
  id: serial('id').primaryKey(),
  url: varchar('url').notNull(),
  stringUrl: varchar('string_url').notNull(),
  createdAt,
  updatedAt,
});

export const classPresences = pgTable('class_presences', {
  id: uuid('id').primaryKey().default(generateUUID),
  isSecure: boolean('is_secure'),
  geolocation: jsonb('geolocation').$type<Geolocation>(),
  expireAt: timestamp('expire_at'),
  toleranceTimes: integer('tolerance_times').default(30),
  classId: uuid('class_id')
    .notNull()
    .references(() => classes.id, { onDelete: 'cascade' }),
  barcodeId: integer('barcode_id').references(() => barcodes.id, {
    onDelete: 'cascade',
  }),
  lecturerId: uuid('lecturer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
});

export const userPresences = pgTable('user_presences', {
  id: serial('id').primaryKey(),
  status: varchar('status'),
  message: varchar('message'),
  geolocation: jsonb('geolocation').$type<Geolocation>(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  classPresencesId: uuid('class_presences_id')
    .notNull()
    .references(() => classPresences.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
});

// Relations

export const usersRelation = relations(users, ({ one }) => ({
  role: one(userRole, {
    fields: [users.role],
    references: [userRole.role],
  }),
  contacts: one(contacts, {
    fields: [users.contactsId],
    references: [contacts.id],
  }),
}));

export const classesRelation = relations(classes, ({ one, many }) => ({
  lecturer: one(users, {
    fields: [classes.lecturerId],
    references: [users.id],
  }),
  classPresences: many(classPresences),
}));

export const userPresencesRelation = relations(userPresences, ({ one }) => ({
  status: one(presencesStatus, {
    fields: [userPresences.status],
    references: [presencesStatus.status],
  }),
  // barcodes: one(barcodes, {
  //   fields: [userPresences.barcodesId],
  //   references: [barcodes.id],
  // }),
  user: one(users, {
    fields: [userPresences.userId],
    references: [users.id],
  }),
  classPresences: one(classPresences, {
    fields: [userPresences.classPresencesId],
    references: [classPresences.id],
  }),
}));

export const classPresencesRelation = relations(
  classPresences,
  ({ one, many }) => ({
    barcode: one(barcodes, {
      fields: [classPresences.barcodeId],
      references: [barcodes.id],
    }),
    lecturer: one(users, {
      fields: [classPresences.lecturerId],
      references: [users.id],
    }),
    userPresences: many(userPresences),
    class: one(classes, {
      fields: [classPresences.classId],
      references: [classes.id],
    }),
  }),
);
export const userClassesRelation = relations(userClasses, ({ one }) => ({
  user: one(users, {
    fields: [userClasses.userId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [userClasses.classId],
    references: [classes.id],
  }),
}));
