import { FlutterRowInfo, Path } from '../../models';
import { BasicForm } from './basic-form';

type BasicFormArrayProps = {
  settingList: FlutterRowInfo[];
  path: Path;
  isDisabled: boolean;
};

export const BasicFormArray = ({ settingList, path, isDisabled }: BasicFormArrayProps) => {
  return (
    <>
      {settingList.map((item: FlutterRowInfo, index: number) => (
        <BasicForm
          key={item.RowIdx}
          basicKey={item.Title}
          item={item}
          path={[...path, 'children', index]}
          index={index}
          isDisabled={isDisabled}
        />
      ))}
    </>
  );
};
