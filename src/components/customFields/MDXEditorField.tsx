import { useEffect, useRef, useState } from "react";
import { Buildable, Field, Label } from "@daohaus/ui";
import { useFormContext } from "react-hook-form";

import {
    MDXEditor,
    headingsPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    BlockTypeSelect,
    quotePlugin,
    listsPlugin,
    ListsToggle,
    MDXEditorMethods,
    linkPlugin,
    linkDialogPlugin,
    CreateLink,
    DiffSourceToggleWrapper,
    diffSourcePlugin,
    codeBlockPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import styled from "styled-components";
import { LinkStyles } from "@daohaus/ui";

const MarkDownContainer = styled.div`
  padding: 10px;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.input.bg};
  color: ${({ theme }) => theme.input.color};
  font-size: ${({ theme }) => theme.field.fontSize};
  font-weight: ${({ theme }) => theme.field.fontWeight};
  font-family: ${({ theme }) => theme.field.inputFont};
  min-height: 10vh;
  max-height: 50vh;
  overflow: auto;
  a {
    ${LinkStyles};
  }
`;

export const MDXEditorField = (props: Buildable<Field>) => {
    const { setValue, watch } = useFormContext();
    const [content, createdAt] = watch([props.id, "createdAt"]);

    const label = props.label || props.id;

    const ref = useRef<MDXEditorMethods>(null);

    const handleOnChange = (value: string) => {
        setValue(props.id, value);
    };

    useEffect(() => {
        setValue(props.id, '');
    }, []);

    return (
        <>
            <Label children={label} id={props.id} />
            <MarkDownContainer>
                <MDXEditor
                    ref={ref}
                    className="dark-theme dark-editor"
                    markdown={""}
                    plugins={[
                        diffSourcePlugin({
                            diffMarkdown: content || "",
                            viewMode: "rich-text",
                        }),
                        codeBlockPlugin(),
                        listsPlugin(),
                        quotePlugin(),
                        headingsPlugin(),
                        linkPlugin(),
                        linkDialogPlugin(),
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    <DiffSourceToggleWrapper>
                                        <BoldItalicUnderlineToggles />
                                        <CreateLink />
                                        <ListsToggle /> <BlockTypeSelect />
                                        <UndoRedo />
                                    </DiffSourceToggleWrapper>
                                </>
                            ),
                        }),
                    ]}
                    onChange={handleOnChange}

                />
            </MarkDownContainer>
        </>
    );
};
