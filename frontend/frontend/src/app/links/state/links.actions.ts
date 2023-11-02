import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LinksEntity } from ".";

export const LinksEvents = createActionGroup({
  source: "Links Events",
  events: {
    "Links Entered": emptyProps(),
    "User Logged In": emptyProps(),
  },
});

export type LinksCreate = Omit<LinksEntity, "id">;

export const LinksCommands = createActionGroup({
  source: "Links Commands",
  events: {
    "Remove Link": props<{ payload: LinksEntity }>(),
    "Add Link": (linkCreate: LinksCreate) => ({
      payload: {
        id: crypto.randomUUID(),
        ...linkCreate,
      } as LinksEntity,
    }),
  },
});

export const LinksDocuments = createActionGroup({
  source: "Link Documents",
  events: {
    Links: props<{ payload: LinksEntity[] }>(),
  },
});
