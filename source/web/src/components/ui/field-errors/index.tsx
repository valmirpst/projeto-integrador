import { Text } from "../text";

export function FieldErrors({ error, errors }: { error?: string | null; errors?: string[] | undefined }) {
  if (error) {
    return (
      <Text key={error} size="sm" color="danger500">
        {error}
      </Text>
    );
  }

  return errors?.map(err => (
    <Text key={err} size="sm" color="danger500">
      {err}
    </Text>
  ));
}
