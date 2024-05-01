import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, Field } from "@daohaus/ui";

import { useParams } from "react-router-dom";

export const ParamTag = (props: Buildable<Field>) => {
  const { setValue } = useFormContext();
  // use params tag
  const { tag } = useParams();
  useEffect(() => {
    if (tag == "personal" || tag == "topic") {
      setValue(props.id, tag);
    }
  }, [tag]);

  return null;
};
