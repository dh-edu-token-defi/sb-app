import { useEffect, useRef, useState } from 'react';
import {
    Buildable,

    Field,

} from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select'

import styled from 'styled-components';



const MultiSelectContainer = styled.div`
  
`;

export const MultiSelect = (props: Buildable<Field>) => {
    const { setValue, watch } = useFormContext();
    const [content, createdAt] = watch([props.id, "createdAt"]);

    const options = [
        { value: 'technology', label: 'Technology' },
        { value: 'education', label: 'Education' },
        { value: 'philosophy', label: 'Philosophy' },
        { value: 'art', label: 'Art' },
        { value: 'finance', label: 'Finance' },
        { value: 'activism', label: 'Activism' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'politics', label: 'Politics' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'wtf', label: 'wtf' },
        { value: 'special', label: 'Special' },
      ]
    
    const [selectedOption, setSelectedOption] = useState();

    function handleChange(selectedOption: any) {
        const selectedValues = selectedOption.map((option: any) => option.value)
        setValue(props.id, selectedValues);
        setSelectedOption(selectedOption)
    }

    useEffect(() => {
        const drafts = localStorage.getItem("drafts") || "{}" as string;
        const parsedDrafts = JSON.parse(drafts);

        if (parsedDrafts[createdAt]) {

            if(!parsedDrafts[createdAt].tags) {
                return
            }

            const tags = parsedDrafts[createdAt]?.tags.map((tag: string) => {
                return { value: tag, label: tag[0].toUpperCase() + tag.substring(1).toLowerCase() }
            }
            );
            setSelectedOption(tags || []);

        }

      }, [createdAt]);
    

    return (
        <MultiSelectContainer>
            <Select 
              options={options}
              value={selectedOption}
              onChange={handleChange}
              isMulti
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: "hsl(228, 43.3%, 17.5%)", // TODO: use theme,
                }),
                menuList: base => ({
                    ...base,
                    background: "hsl(228, 43.3%, 17.5%)"
                }),
                option: (styles, {isFocused, isSelected}) => ({
                    ...styles,
                    background: isFocused
                        ? 'hsl(226, 70.0%, 55.5%)'
                        : isSelected
                            ? 'hsla(291, 64%, 42%, 1)'
                            : undefined
                }),
                multiValueRemove: (styles) => ({
                    ...styles,
                    backgroundColor: 'hsl(226, 70.0%, 55.5%)'
                }),
              }}
               />
        </MultiSelectContainer>
    );
};