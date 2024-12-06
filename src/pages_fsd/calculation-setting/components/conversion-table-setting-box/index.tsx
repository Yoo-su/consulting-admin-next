import { useGetCalcConversionTableQuery } from '../../hooks';

type ConversionTableSettingBoxProps = {
  serviceID: string;
};
export const ConversionTableSettingBox = ({
  serviceID,
}: ConversionTableSettingBoxProps) => {
  const { data } = useGetCalcConversionTableQuery(serviceID);

  return <div></div>;
};
