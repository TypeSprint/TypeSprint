export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',     // New feature
                'fix',      // Bug fix
                'docs',     // Documentation
                'style',    // Formatting, missing semi colons, etc
                'refactor', // Code change that neither fixes a bug nor adds a feature
                'perf',     // Performance improvement
                'test',     // Adding tests
                'chore',    // Maintain
                'revert',   // Revert to a commit
                'build',    // Build system or dependencies
            ],
        ],
        'subject-case': [0],
    }
}