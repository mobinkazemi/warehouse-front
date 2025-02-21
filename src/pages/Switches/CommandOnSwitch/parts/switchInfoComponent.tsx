import { Flex, Typography } from "antd";
import React from "react";
import { ISwitch } from "../../../../shared/interfaces/switch.interface";

const { Text } = Typography;

const SwitchInfoComponent: React.FC<Partial<ISwitch>> = (
  data: Partial<ISwitch>
) => {
  return (
    <>
      <Flex
        vertical={true}
        align="end"
        justify="center"
        wrap="wrap-reverse"
        style={{
          width: "100%",
          backgroundColor: "skyblue",
          height: "7rem",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Text
          style={{
            padding: "5px 5px 5px 5px",
            paddingRight: "10px",
            color: "black",
            fontWeight: "bold",
          }}
          direction="rtl"
        >
          نام سوییچ:‌ {data.name}
        </Text>

        <Text
          style={{
            padding: "5px 5px 5px 5px",

            color: "black",
            fontWeight: "bold",
          }}
          direction="rtl"
        >
          آی‌پی سوییچ:‌ {data.ip}
        </Text>

        <Text
          style={{
            padding: "5px 5px 5px 5px",

            color: "black",
            fontWeight: "bold",
          }}
          direction="rtl"
        >
          مدل سوییچ:‌ {data.model}
        </Text>

        <Text
          style={{
            padding: "5px 5px 5px 5px",

            color: "black",
            fontWeight: "bold",
          }}
          direction="rtl"
        >
          سری سوییچ:‌ {data.series}
        </Text>

        <Text
          style={{
            padding: "5px 5px 5px 5px",
            color: "black",
            fontWeight: "bold",
          }}
          direction="rtl"
        >
          سیستم‌عامل سوییچ:‌ {data.os}
        </Text>
      </Flex>
    </>
  );
};

export default SwitchInfoComponent;
