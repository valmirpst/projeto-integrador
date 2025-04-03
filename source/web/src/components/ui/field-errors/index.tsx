import { Text } from "../text";

export function FieldErrors({ error, errors }: { error?: string | null; errors?: string[] | undefined }) {
  if (error) {
    return (
      <Text key={error} size="sm" variant="danger">
        {error}
      </Text>
    );
  }

  return errors?.map(err => (
    <Text key={err} size="sm" variant="danger">
      {err}
    </Text>
  ));
}
