"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { bigint, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { calBazi } from "@/utils/bazi";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  contractConfig,
} from "@/constant/contract";
import { toast } from "sonner";

dayjs.extend(customParseFormat);

const ProfileForm = forwardRef((props, ref) => {
  const [bazi, setBazi] = useState("");
  const [birthTimestamp, setBirthTimestamp] = useState<number>();
  const [userInfo, setUserInfo] = useState<z.infer<typeof formSchema>>();

  useImperativeHandle(ref, () => ({
    submit: form.handleSubmit(onSubmit),
  }));
  // 查询用户的tokenId
  const { data: samebaziCnt, refetch } = useReadContract({
    ...contractConfig,
    functionName: "sameBaziCnt",
    args: [bazi],
    query: {
      enabled: !!bazi,
    },
  });
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    status,
  } = useWriteContract();
  // 使用 useWaitForTransactionReceipt 监控交易状态
  const {
    isLoading,
    isSuccess,
    isError,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash, // 传入 writeContract 返回的交易 hash
  });
  useEffect(() => {
    if (typeof samebaziCnt === "bigint") {
      console.log(samebaziCnt);
      (async () => {
        const { cid } = await fileUpload();
        if (userInfo?.birthTime && cid) {
          const { gender } = userInfo;
          console.log("调用写合约");
          console.log(bazi);
          console.log(BigInt(gender));
          console.log(BigInt(birthTimestamp!));
          console.log(cid);

          // writeContract({
          //   ...contractConfig,
          //   functionName: "mintSoulBadge",
          //   args: [bazi, BigInt(gender), 116, 23, BigInt(birthTimestamp!), cid],
          // });
          console.log("调用完成");
        }
      })();
    }
  }, [samebaziCnt, userInfo, birthTimestamp, bazi]);

  useEffect(() => {
    console.log(hash);
  }, [hash]);

  useEffect(() => {
    console.log("eeeeeeeeeeeeeeeeeeeee", receiptError); //
  }, [receiptError]);

  useEffect(() => {
    console.log(status);
    console.log(isError);
    console.log(isSuccess);
    console.log("dddd", receiptError); //

    if (isSuccess) {
      toast.success("Event has been created");
    } else if (isError) {
      toast.error("Event has not been created");
    }
  }, [isError, isSuccess, status, receiptError]);

  const formSchema = z.object({
    // longitude: z.string().min(2).max(50),
    // latitude: z.string().min(2).max(50),
    birthDate: z.date({
      required_error: "A date of birth is required.",
    }),
    birthTime: z.string(),
    gender: z.enum(["0", "1"], {
      required_error: "You need to select a gender type.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "1",
    },
  });

  const getCurrentBazi = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const { birthDate, birthTime, gender } = values;
    // 将日期和时间合并成一个 Date 对象
    const birthDateTimeString =
      dayjs(birthDate).format("YYYY-MM-DD") + " " + birthTime;
    const birthDateTime = dayjs(
      birthDateTimeString,
      "YYYY-MM-DD HH:mm:ss"
    ).toDate();
    const birthTimestamp = dayjs(
      birthDateTimeString,
      "YYYY-MM-DD HH:mm:ss"
    ).valueOf();
    // console.log("合并后的 Date 对象:", birthDateTime);
    // console.log("合并后的时间戳:", birthTimestamp);
    const bazi = calBazi({
      year: birthDateTime.getFullYear(),
      month: birthDateTime.getMonth() + 1, // 月份从0开始算
      day: birthDateTime.getDate(),
      hour: birthDateTime.getHours(),
      minute: birthDateTime.getMinutes(),
      gender: Number(gender),
    });
    return {
      year: birthDateTime.getFullYear(),
      month: birthDateTime.getMonth() + 1, // 月份从0开始算
      day: birthDateTime.getDate(),
      hour: birthDateTime.getHours(),
      minute: birthDateTime.getMinutes(),
      gender: Number(gender),
      birthDateTime,
      birthTimestamp,
      bazi: bazi.join(" "),
    };
  };

  const fileUpload = async () => {
    // 构造file
    const file = genderateFileSBT(bazi, Number(userInfo?.gender) as 0 | 1);
    const data = {
      bazi,
      gender: Number(userInfo?.gender),
      longitude: 113,
      latitude: 28,
      birthDate: birthTimestamp,
    };
    const formData = new FormData();
    formData.append("file", file);
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    const response = await fetch("/api/v1/files", {
      method: "post",
      body: formData,
    });
    return await response.json();
  };

  // 计算八字---根据八字查询重复的id---构建SBT---上传到pinata---合约铸造---前端展示
  function onSubmit(values: z.infer<typeof formSchema>) {
    setUserInfo(values);
    // 计算八字
    const { birthTimestamp, bazi } = getCurrentBazi(values);
    setBazi(bazi);
    setBirthTimestamp(birthTimestamp);
  }

  const genderateFileSBT = (
    baziStr: string,
    gender: 0 | 1
    // birthDate: Date
  ) => {
    // const birthDateStr = birthDate.getDate();
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <!-- 背景: 简约的浅灰色背景，圆角 -->
    <rect width="400" height="300" fill="#F8F8F8" rx="15" ry="15" />

    <!-- 八字字符串: 居中，大字体，深色，突出显示 -->
    <text x="200" y="100" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#333" text-anchor="middle">
        ${baziStr}
    </text>

    <!-- 分割线: 细致的灰色线条 -->
    <line x1="50" y1="150" x2="350" y2="150" stroke="#DDD" stroke-width="1" />

    <!-- 其他信息: 左对齐，较小字体，中等灰色 -->
    <text x="50" y="180" font-family="Arial, sans-serif" font-size="16" fill="#555">性别: ${gender ? "男" : "女"}</text>
    <text x="50" y="210" font-family="Arial, sans-serif" font-size="16" fill="#555">经度: ${106}</text>
    <text x="50" y="240" font-family="Arial, sans-serif" font-size="16" fill="#555">出生: ${dayjs(birthTimestamp).format("YYYY-MM-DD HH:mm")}</text>

    <!-- 底部文字: 居中，更小的字体，浅灰色 -->
    <text x="200" y="280" font-family="Arial, sans-serif" font-size="12" fill="#888" text-anchor="middle">SoulBadge</text>
</svg>`;
    const sbtFile = new File(
      [new Blob([svgString], { type: "image/svg+xml" })],
      "sbt",
      {
        type: "image/svg+xml",
      }
    );
    return sbtFile;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>出生日期</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>选择日期</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>出生时间</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>性别</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">男</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">女</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button
        onClick={() => {
          console.log('cnm');
          
          writeContract({
            ...contractConfig,
            functionName: "mintSoulBadge",
            args: ['bazi', 1, 116, 23, 911715254n, 'cid'],
          });
        }}
      >
        test
      </Button>
    </Form>
  );
});

ProfileForm.displayName = "ProfileForm";

export default ProfileForm;
