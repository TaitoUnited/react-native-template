import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FillButton } from './Buttons/FillButton';
import { Checkbox } from './Inputs/Checkbox';
import { PickerModal } from './PickerModal';
import { PickerSheet } from './PickerSheet';
import { Spacer } from './Spacer';
import { range } from './utils';
import { styled } from '~styles/styled';

const optionsHandler = (number: number) =>
  range(number).map((i) => ({
    label: `Option ${i + 1}`,
    value: `${i + 1}`,
  }));

const numberOfOptionsVariations = [5, 20];

function AllVariants() {
  // With one option
  const [highNumberOfOptions, setHighNumberOfOptions] = useState(false);
  const [options, setOptions] = useState(
    optionsHandler(
      highNumberOfOptions
        ? numberOfOptionsVariations[1]
        : numberOfOptionsVariations[0],
    ),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setOptions(
      optionsHandler(
        highNumberOfOptions
          ? numberOfOptionsVariations[1]
          : numberOfOptionsVariations[0],
      ),
    );
  }, [highNumberOfOptions]);

  function onPressHandler() {
    setIsOpen(!isOpen);
    console.log('Opening modal');
  }

  function onOptionSelectHandler(newOptionValue: string) {
    setSelected(
      options.find((op) => op.value === newOptionValue) as typeof options[0],
    );
    console.log('Selected option value: ', newOptionValue);
  }

  // With multiple options
  const [isMultipleOpen, setIsMultipleOpen] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([options[0]]);

  function onPressMultipleHandler() {
    setIsMultipleOpen(!isMultipleOpen);
    console.log('Opening modal with multiple options');
  }

  function onOptionMultipleSelectHandler(newOptionsValues: string[]) {
    const newOptions = options.filter((op) =>
      newOptionsValues.includes(op.value),
    );
    setMultipleSelected(newOptions);
    console.log('Selected options values: ', newOptionsValues);
  }

  return (
    <View>
      <CheckBoxWrapper>
        <Checkbox
          value="LotsOfOptions"
          label="With a lot of options"
          checked={highNumberOfOptions}
          onChange={() => setHighNumberOfOptions(!highNumberOfOptions)}
        />
      </CheckBoxWrapper>

      <FillButton variant="primary" onPress={onPressHandler}>
        Open {highNumberOfOptions ? 'Sheet' : 'Picker'} Modal
      </FillButton>
      {highNumberOfOptions ? (
        <PickerSheet
          isVisible={isOpen}
          label={'Choose an option'}
          onOptionSelect={(newOption) =>
            onOptionSelectHandler(newOption as string)
          }
          onClose={onPressHandler}
          options={options}
          selected={selected.value}
        />
      ) : (
        <PickerModal
          isVisible={isOpen}
          label={'Choose an option'}
          onOptionSelect={(newOption) =>
            onOptionSelectHandler(newOption as string)
          }
          onClose={onPressHandler}
          options={options}
          selected={selected.value}
        />
      )}
      <Spacer size="large" />
      <FillButton variant="primary" onPress={onPressMultipleHandler}>
        Open {highNumberOfOptions ? 'Sheet' : 'Picker'} Modal w/ multiple
        options
      </FillButton>
      {highNumberOfOptions ? (
        <PickerSheet
          isVisible={isMultipleOpen}
          label={'Choose multiple options'}
          onOptionSelect={(newOptions) =>
            onOptionMultipleSelectHandler(newOptions as string[])
          }
          onClose={onPressMultipleHandler}
          options={options}
          selected={multipleSelected.map((op) => op.value)}
          multiple
        />
      ) : (
        <PickerModal
          isVisible={isMultipleOpen}
          label={'Choose multiple options'}
          onOptionSelect={(newOptions) =>
            onOptionMultipleSelectHandler(newOptions as string[])
          }
          onClose={onPressMultipleHandler}
          options={options}
          selected={multipleSelected.map((op) => op.value)}
          multiple
        />
      )}
    </View>
  );
}

export function ModalsWrapper() {
  return <AllVariants />;
}

const CheckBoxWrapper = styled('View', {
  padding: '$small',
  marginBottom: '$small',
});
