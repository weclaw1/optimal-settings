"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { addReport } from "../actions";
import { OperatingSystem, SettingsType } from "../types/report";
import Form from "@/components/Form";
import FormSubmitButton from "@/components/FormSubmitButton";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormTextarea from "@/components/FormTextarea";
import Script from 'next/script';

type ReportForm = {
  gameId: number;
  gameSlug: string;
  settingsType: SettingsType;
};

export default function ReportForm({
  gameId,
  gameSlug,
  settingsType,
}: ReportForm) {
  const [state, formAction] = useFormState(addReport, {
    gameId,
    gameSlug,
    settingsType,
    errors: {},
  });
  const [selectedOperatingSystem, setSelectedOperatingSystem] =
    useState<OperatingSystem>("Windows");

  const operatingSystemVersionPlaceholders: Record<OperatingSystem, string> = {
    Windows: "Windows 10",
    MacOS: "macOS 14.1.1",
    Linux: "Ubuntu 22.04 LTS",
    Other: "Redox OS 0.8.0",
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <Form centered formAction={formAction} errors={state.errors.formErrors}>
        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder="John Doe"
          errors={state.errors.fieldErrors?.username}
        />
        <FormInput
          label="Average FPS"
          name="averageFramesPerSecond"
          type="number"
          min={1}
          step={1}
          required
          placeholder="60"
          errors={state.errors.fieldErrors?.averageFramesPerSecond}
        />
        <FormSelect
          label="Operating System"
          name="operatingSystem"
          required
          placeholder="Select operating system"
          options={[
            ["Windows", "Windows"],
            ["MacOS", "macOS"],
            ["Linux", "Linux"],
            ["Other", "Other"],
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
        {selectedOperatingSystem === "Linux" && (
          <FormInput
            label="Kernel version"
            name="kernelVersion"
            type="text"
            placeholder="Linux 6.5.11-300.fc39.x86_64"
            errors={state.errors.fieldErrors?.kernelVersion}
          />
        )}
        <FormInput
          label="Resolution width"
          name="resolutionWidth"
          type="text"
          required
          placeholder="1920"
          errors={state.errors.fieldErrors?.resolutionWidth}
        />
        <FormInput
          label="Resolution height"
          name="resolutionHeight"
          type="text"
          required
          placeholder="1080"
          errors={state.errors.fieldErrors?.resolutionHeight}
        />
        <FormInput
          label="CPU"
          name="processor"
          type="text"
          required
          placeholder="AMD Ryzen™ 7 6800HS"
          errors={state.errors.fieldErrors?.processor}
        />
        <FormInput
          label="GPU"
          name="graphicsCard"
          type="text"
          required
          placeholder="AMD Radeon™ RX 6700S"
          errors={state.errors.fieldErrors?.graphicsCard}
        />
        <FormInput
          label="RAM"
          name="randomAccessMemory"
          type="text"
          required
          placeholder="32GB"
          errors={state.errors.fieldErrors?.randomAccessMemory}
        />
        <FormTextarea
          label="Comments"
          name="comments"
          placeholder="The game is really playable, but the FPS drops to 30 when there are a lot of enemies on the screen."
          errors={state.errors.fieldErrors?.comments}
        />
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
        />
        <FormSubmitButton title="Submit" />
      </Form>
    </>
  );
}
