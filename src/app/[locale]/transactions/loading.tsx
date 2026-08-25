import { Loading } from "@/components/UI";
import { FlexCol, FlexRow } from "@/components/UI/Flex";
import withLocale from "@/libs/withLocale";

const { Skeleton } = Loading;

const TransactionLoading = () => {
  return (
    <div className="w-full">
      <Skeleton type="title" />
      <FlexRow justify="between">
        <FlexCol xs={24} span={18}>
          <Skeleton rootClassName="mb-5!" type="button" options={{ width: "100%", height: "700px" }} />
          <FlexRow justify="end">
            <FlexCol xs={10} span={10}>
              <Skeleton type="button" options={{ width: "100%" }} />
            </FlexCol>
          </FlexRow>
        </FlexCol>
        <FlexCol xs={0} span={6}>
          <Skeleton type="button" options={{ width: "100%", height: "400px" }} />
        </FlexCol>
      </FlexRow>
    </div>
  );
};

export default withLocale(TransactionLoading);
