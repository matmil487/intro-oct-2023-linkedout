import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LinksEntity } from ".";

export const LinksEvents = createActionGroup({
  source: "Links Events",
  events: {
    "Links Entered": emptyProps(),
  },
});

export type LinksCreate = Omit<LinksEntity, "id">;

export const LinksCommands = createActionGroup({
  source: "Links Commands",
  events: {
    "Add Link": (linkCreate: LinksCreate) => ({
      payload: {
        id: crypto.randomUUID(),
        ...linkCreate,
      } as LinksEntity,
    }),
  },
});
