"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { addReport } from "../actions";
import { OperatingSystem } from "../types/report";
import Form from "@/components/Form";
import FormSubmitButton from "@/components/FormSubmitButton";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormTextarea from "@/components/FormTextarea";

type ReportFormProps = {
  gameId: string;
  gameSlug: string;
  settingsType: "low" | "medium" | "high";
};

export default function ReportForm({
  gameId,
  gameSlug,
  settingsType,
}: ReportFormProps) {
  const [state, formAction] = useFormState(addReport, {
    gameId,
    gameSlug,
    settingsType,
    errors: {},
  });
  const [selectedOperatingSystem, setSelectedOperatingSystem] =
    useState<OperatingSystem>("windows");

  const operatingSystemVersionPlaceholders: Record<OperatingSystem, string> = {
    windows: "Windows 10",
    macos: "macOS 14.1.1",
    linux: "Ubuntu 22.04 LTS",
  };

  return (
    <Form centered formAction={formAction}>
      <FormInput
        label="Username"
        name="username"
        type="text"
        placeholder="John Doe"
        errors={state.errors.fieldErrors?.username}
      />
      <FormInput
        label="Average FPS"
        name="fps"
        type="number"
        min={1}
        step={1}
        required
        placeholder="60"
        errors={state.errors.fieldErrors?.fps}
      />
      <FormSelect
        label="Operating System"
        name="operatingSystem"
        required
        placeholder="Select operating system"
        options={[
          ["windows", "Windows"],
          ["macos", "macOS"],
          ["linux", "Linux"],
        ]}
        onChange={(e) =>
          setSelectedOperatingSystem(e.target.value as OperatingSystem)
        }
        errors={state.errors.fieldErrors?.operatingSystem}
      />
      <FormInput
        label="Operating System version"
        name="operatingSystemVersion"
        type="text"
        required
        placeholder={
          operatingSystemVersionPlaceholders[selectedOperatingSystem]
        }
        errors={state.errors.fieldErrors?.operatingSystemVersion}
      />
      {selectedOperatingSystem === "linux" && (
        <FormInput
          label="Kernel version"
          name="kernelVersion"
          type="text"
          placeholder="Linux 6.5.11-300.fc39.x86_64"
          errors={state.errors.fieldErrors?.kernelVersion}
        />
      )}
      <FormInput
        label="Resolution"
        name="resolution"
        type="text"
        required
        placeholder="1920x1080"
        errors={state.errors.fieldErrors?.resolution}
      />
      <FormInput
        label="CPU"
        name="cpu"
        type="text"
        required
        placeholder="AMD Ryzen™ 7 6800HS"
        errors={state.errors.fieldErrors?.cpu}
      />
      <FormInput
        label="GPU"
        name="gpu"
        type="text"
        required
        placeholder="AMD Radeon™ RX 6700S"
        errors={state.errors.fieldErrors?.gpu}
      />
      <FormInput
        label="RAM"
        name="ram"
        type="text"
        required
        placeholder="32GB"
        errors={state.errors.fieldErrors?.ram}
      />
      <FormTextarea
        label="Comments"
        name="comments"
        placeholder="The game is really playable, but the FPS drops to 30 when there are a lot of enemies on the screen."
        errors={state.errors.fieldErrors?.comments}
      />
      <FormSubmitButton title="Submit" />
    </Form>
  );
}
